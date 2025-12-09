const Property = require('../models/Property')
const User = require('../models/User')
const { deleteFiles } = require('../middleware/upload')
const path = require('path')

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      propertyType,
      city,
      state,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      minSquareFootage,
      maxSquareFootage,
      featured,
      status,
      approvalStatus,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query

    // Build query
    let query = {}
    
    // For public access (no auth), only show approved and active properties
    // For admin access (with auth), show all or filter by approvalStatus
    const isAuthenticated = req.headers.authorization
    
    if (!isAuthenticated) {
      // Public access - only approved and active
      query.approvalStatus = 'approved'
      query.isActive = true
      query.status = 'Available'
    } else {
      // Admin access - allow filtering
      if (approvalStatus) {
        query.approvalStatus = approvalStatus
      }
      if (status) {
        query.status = status
      }
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.address': { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { 'location.state': { $regex: search, $options: 'i' } }
      ]
    }

    // Filters
    if (propertyType) query.propertyType = propertyType
    if (city) query['location.city'] = { $regex: city, $options: 'i' }
    if (state) query['location.state'] = { $regex: state, $options: 'i' }
    if (bedrooms) query.bedrooms = parseInt(bedrooms)
    if (bathrooms) query.bathrooms = parseInt(bathrooms)
    if (featured !== undefined) query.featured = featured === 'true'

    // Price range
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = parseInt(minPrice)
      if (maxPrice) query.price.$lte = parseInt(maxPrice)
    }

    // Square footage range
    if (minSquareFootage || maxSquareFootage) {
      query.squareFootage = {}
      if (minSquareFootage) query.squareFootage.$gte = parseInt(minSquareFootage)
      if (maxSquareFootage) query.squareFootage.$lte = parseInt(maxSquareFootage)
    }

    // Sorting
    const sortOptions = {}
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1

    // Pagination
    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    // Execute query
    const properties = await Property.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .lean()

    // Get total count for pagination
    const total = await Property.countDocuments(query)

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      pagination: {
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      },
      data: properties
    })
  } catch (error) {
    console.error('Get properties error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).lean()

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      })
    }

    // Increment views (non-blocking)
    Property.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }).catch(err => 
      console.error('Error incrementing views:', err)
    )

    res.status(200).json({
      success: true,
      data: property
    })
  } catch (error) {
    console.error('Get property error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// @desc    Create property
// @route   POST /api/properties
// @access  Private (Admin/Agent)
const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      propertyType,
      bedrooms,
      bathrooms,
      squareFootage,
      yearBuilt,
      amenities,
      featured,
      virtualTourUrl,
      seoTitle,
      seoDescription,
      seoKeywords
    } = req.body

    // Handle uploaded images
    let images = []
    if (req.uploadedFiles && req.uploadedFiles.propertyImages) {
      images = req.uploadedFiles.propertyImages.map(file => ({
        url: file.url,
        filename: file.filename,
        alt: `${title} - Image`
      }))
    }

    // Handle uploaded documents
    let documents = []
    if (req.uploadedFiles && req.uploadedFiles.documents) {
      documents = req.uploadedFiles.documents.map(file => ({
        url: file.url,
        filename: file.filename,
        name: file.originalName,
        type: file.mimetype.includes('pdf') ? 'pdf' : 'image'
      }))
    }

    const property = await Property.create({
      title,
      description,
      price: parseInt(price),
      location: JSON.parse(location),
      propertyType,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      squareFootage: parseInt(squareFootage),
      yearBuilt: yearBuilt ? parseInt(yearBuilt) : undefined,
      images,
      amenities: amenities ? JSON.parse(amenities) : [],
      featured: featured === 'true',
      virtualTourUrl,
      documents,
      agent: req.user.id,
      seo: {
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords ? seoKeywords.split(',').map(k => k.trim()) : []
      }
    })

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property
    })
  } catch (error) {
    console.error('Create property error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during property creation'
    })
  }
}

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Admin/Agent/Owner)
const updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      })
    }

    // Check ownership (admin can update any, agents can update their own)
    // Skip check if property has no agent (API submissions) or user is admin
    if (req.user.role !== 'admin' && property.agent && property.agent.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      })
    }

    const {
      title,
      description,
      price,
      location,
      propertyType,
      bedrooms,
      bathrooms,
      squareFootage,
      yearBuilt,
      amenities,
      featured,
      status,
      virtualTourUrl,
      seoTitle,
      seoDescription,
      seoKeywords,
      removeImages,
      removeDocuments
    } = req.body

    // Handle image removal
    if (removeImages) {
      const imagesToRemove = JSON.parse(removeImages)
      const filesToDelete = []
      
      property.images = property.images.filter(image => {
        if (imagesToRemove.includes(image.filename)) {
          filesToDelete.push(path.join(__dirname, '../uploads/properties', image.filename))
          return false
        }
        return true
      })
      
      if (filesToDelete.length > 0) {
        deleteFiles(filesToDelete)
      }
    }

    // Handle document removal
    if (removeDocuments) {
      const documentsToRemove = JSON.parse(removeDocuments)
      const filesToDelete = []
      
      property.documents = property.documents.filter(doc => {
        if (documentsToRemove.includes(doc.filename)) {
          filesToDelete.push(path.join(__dirname, '../uploads/documents', doc.filename))
          return false
        }
        return true
      })
      
      if (filesToDelete.length > 0) {
        deleteFiles(filesToDelete)
      }
    }

    // Add new images
    if (req.uploadedFiles && req.uploadedFiles.propertyImages) {
      const newImages = req.uploadedFiles.propertyImages.map(file => ({
        url: file.url,
        filename: file.filename,
        alt: `${title || property.title} - Image`
      }))
      property.images.push(...newImages)
    }

    // Add new documents
    if (req.uploadedFiles && req.uploadedFiles.documents) {
      const newDocuments = req.uploadedFiles.documents.map(file => ({
        url: file.url,
        filename: file.filename,
        name: file.originalName,
        type: file.mimetype.includes('pdf') ? 'pdf' : 'image'
      }))
      property.documents.push(...newDocuments)
    }

    // Update other fields
    if (title) property.title = title
    if (description) property.description = description
    if (price) property.price = parseInt(price)
    if (location) {
      property.location = typeof location === 'string' ? JSON.parse(location) : location
    }
    if (propertyType) property.propertyType = propertyType
    if (bedrooms) property.bedrooms = parseInt(bedrooms)
    if (bathrooms) property.bathrooms = parseInt(bathrooms)
    if (squareFootage) property.sqft = parseInt(squareFootage)
    if (req.body.sqft) property.sqft = parseInt(req.body.sqft)
    if (yearBuilt) property.yearBuilt = parseInt(yearBuilt)
    if (amenities) {
      property.amenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities
    }
    if (featured !== undefined) {
      property.featured = typeof featured === 'boolean' ? featured : featured === 'true'
    }
    if (status) property.status = status
    if (virtualTourUrl) property.virtualTourUrl = virtualTourUrl
    
    // Handle approval status and active state for review mode
    if (req.body.approvalStatus) property.approvalStatus = req.body.approvalStatus
    if (req.body.isActive !== undefined) property.isActive = req.body.isActive
    
    // Handle listingAgent update
    if (req.body.listingAgent) {
      property.listingAgent = typeof req.body.listingAgent === 'string' 
        ? JSON.parse(req.body.listingAgent) 
        : req.body.listingAgent
    }

    // Update SEO
    if (seoTitle || seoDescription || seoKeywords) {
      property.seo = {
        title: seoTitle || property.seo.title,
        description: seoDescription || property.seo.description,
        keywords: seoKeywords ? seoKeywords.split(',').map(k => k.trim()) : property.seo.keywords
      }
    }

    await property.save()

    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: property
    })
  } catch (error) {
    console.error('Update property error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during property update'
    })
  }
}

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Admin/Agent/Owner)
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      })
    }

    // Check ownership
    if (req.user.role !== 'admin' && property.agent.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      })
    }

    // Delete associated files
    const filesToDelete = []
    
    // Add images to deletion list
    property.images.forEach(image => {
      filesToDelete.push(path.join(__dirname, '../uploads/properties', image.filename))
    })
    
    // Add documents to deletion list
    property.documents.forEach(doc => {
      filesToDelete.push(path.join(__dirname, '../uploads/documents', doc.filename))
    })
    
    if (filesToDelete.length > 0) {
      deleteFiles(filesToDelete)
    }

    await Property.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    })
  } catch (error) {
    console.error('Delete property error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during property deletion'
    })
  }
}

// @desc    Get featured properties
// @route   GET /api/properties/featured
// @access  Public
const getFeaturedProperties = async (req, res) => {
  try {
    const { limit = 6 } = req.query

    const properties = await Property.getFeatured(parseInt(limit))

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    })
  } catch (error) {
    console.error('Get featured properties error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Search properties
// @route   GET /api/properties/search
// @access  Public
const searchProperties = async (req, res) => {
  try {
    const {
      q: query,
      propertyType,
      city,
      state,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      page = 1,
      limit = 12
    } = req.query

    const filters = {}
    
    if (propertyType) filters.propertyType = propertyType
    if (city) filters.city = city
    if (state) filters.state = state
    if (minPrice) filters.minPrice = parseInt(minPrice)
    if (maxPrice) filters.maxPrice = parseInt(maxPrice)
    if (bedrooms) filters.bedrooms = parseInt(bedrooms)
    if (bathrooms) filters.bathrooms = parseInt(bathrooms)

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)

    const result = await Property.searchProperties(query, filters, pageNum, limitNum)

    res.status(200).json({
      success: true,
      count: result.properties.length,
      total: result.total,
      pagination: {
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(result.total / limitNum),
        hasNext: pageNum < Math.ceil(result.total / limitNum),
        hasPrev: pageNum > 1
      },
      data: result.properties
    })
  } catch (error) {
    console.error('Search properties error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get similar properties
// @route   GET /api/properties/:id/similar
// @access  Public
const getSimilarProperties = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      })
    }

    const { limit = 4 } = req.query

    // Find similar properties based on type, city, and price range
    const priceRange = property.price * 0.3 // 30% price range
    const similarProperties = await Property.find({
      _id: { $ne: property._id },
      status: 'active',
      propertyType: property.propertyType,
      'location.city': property.location.city,
      price: {
        $gte: property.price - priceRange,
        $lte: property.price + priceRange
      }
    })
    .populate('agent', 'name email phone avatar')
    .limit(parseInt(limit))
    .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: similarProperties.length,
      data: similarProperties
    })
  } catch (error) {
    console.error('Get similar properties error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get property statistics
// @route   GET /api/properties/stats
// @access  Public
const getPropertyStats = async (req, res) => {
  try {
    const stats = await Property.aggregate([
      {
        $match: { status: 'active' }
      },
      {
        $group: {
          _id: null,
          totalProperties: { $sum: 1 },
          averagePrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          totalViews: { $sum: '$views' }
        }
      }
    ])

    const typeStats = await Property.aggregate([
      {
        $match: { status: 'active' }
      },
      {
        $group: {
          _id: '$propertyType',
          count: { $sum: 1 },
          averagePrice: { $avg: '$price' }
        }
      }
    ])

    const cityStats = await Property.aggregate([
      {
        $match: { status: 'active' }
      },
      {
        $group: {
          _id: '$location.city',
          count: { $sum: 1 },
          averagePrice: { $avg: '$price' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ])

    res.status(200).json({
      success: true,
      data: {
        general: stats[0] || {
          totalProperties: 0,
          averagePrice: 0,
          minPrice: 0,
          maxPrice: 0,
          totalViews: 0
        },
        byType: typeStats,
        byCities: cityStats
      }
    })
  } catch (error) {
    console.error('Get property stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Create pending property from API
// @route   POST /api/properties/pending
// @access  Public (or with API key authentication)
const createPendingProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      propertyType,
      bedrooms,
      bathrooms,
      sqft,
      yearBuilt,
      amenities,
      images,
      listingAgent
    } = req.body

    // Validate required fields
    if (!title || !description || !price || !location || !propertyType || !bedrooms || !bathrooms || !sqft || !listingAgent) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      })
    }

    // Create property with pending status and api source
    const property = await Property.create({
      title,
      description,
      price: parseInt(price),
      location,
      propertyType,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      sqft: parseInt(sqft),
      yearBuilt: yearBuilt ? parseInt(yearBuilt) : undefined,
      amenities: amenities || [],
      images: images || [],
      listingAgent,
      approvalStatus: 'pending',
      source: 'api',
      status: 'Available',
      featured: false,
      isActive: false // Keep inactive until approved
    })

    res.status(201).json({
      success: true,
      message: 'Property submitted for approval',
      data: {
        id: property._id,
        title: property.title,
        approvalStatus: property.approvalStatus,
        source: property.source
      }
    })
  } catch (error) {
    console.error('Create pending property error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during property submission',
      error: error.message
    })
  }
}

module.exports = {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  searchProperties,
  getSimilarProperties,
  getPropertyStats,
  createPendingProperty
}