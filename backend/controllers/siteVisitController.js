const SiteVisit = require('../models/SiteVisit')
const Property = require('../models/Property')

// @desc    Get user's site visits
// @route   GET /api/sitevisits
// @access  Private
const getSiteVisits = async (req, res) => {
  try {
    const { status } = req.query
    const query = { user: req.user.id }
    
    if (status) {
      query.status = status
    }

    const siteVisits = await SiteVisit.find(query)
      .populate('property', 'title price location images propertyType')
      .sort({ visitDate: -1 })

    res.json({
      success: true,
      data: siteVisits
    })
  } catch (error) {
    console.error('Get site visits error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Create site visit
// @route   POST /api/sitevisits
// @access  Private
const createSiteVisit = async (req, res) => {
  try {
    const { propertyId, visitDate, notes } = req.body

    // Check if property exists
    const property = await Property.findById(propertyId)
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      })
    }

    // Check if visit already exists for this property and date
    const existingVisit = await SiteVisit.findOne({
      user: req.user.id,
      property: propertyId,
      visitDate: new Date(visitDate)
    })

    if (existingVisit) {
      return res.status(400).json({
        success: false,
        message: 'Visit already scheduled for this property on this date'
      })
    }

    const siteVisit = await SiteVisit.create({
      user: req.user.id,
      property: propertyId,
      visitDate: new Date(visitDate),
      notes: notes || ''
    })

    const populatedVisit = await SiteVisit.findById(siteVisit._id)
      .populate('property', 'title price location images propertyType')

    res.status(201).json({
      success: true,
      message: 'Site visit scheduled successfully',
      data: populatedVisit
    })
  } catch (error) {
    console.error('Create site visit error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Update site visit
// @route   PUT /api/sitevisits/:id
// @access  Private
const updateSiteVisit = async (req, res) => {
  try {
    const { status, notes, rating, feedback } = req.body

    const siteVisit = await SiteVisit.findOne({
      _id: req.params.id,
      user: req.user.id
    })

    if (!siteVisit) {
      return res.status(404).json({
        success: false,
        message: 'Site visit not found'
      })
    }

    // Update fields
    if (status) siteVisit.status = status
    if (notes !== undefined) siteVisit.notes = notes
    if (rating) siteVisit.rating = rating
    if (feedback !== undefined) siteVisit.feedback = feedback

    await siteVisit.save()

    const updatedVisit = await SiteVisit.findById(siteVisit._id)
      .populate('property', 'title price location images propertyType')

    res.json({
      success: true,
      message: 'Site visit updated successfully',
      data: updatedVisit
    })
  } catch (error) {
    console.error('Update site visit error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Delete site visit
// @route   DELETE /api/sitevisits/:id
// @access  Private
const deleteSiteVisit = async (req, res) => {
  try {
    const siteVisit = await SiteVisit.findOne({
      _id: req.params.id,
      user: req.user.id
    })

    if (!siteVisit) {
      return res.status(404).json({
        success: false,
        message: 'Site visit not found'
      })
    }

    await SiteVisit.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: 'Site visit deleted successfully'
    })
  } catch (error) {
    console.error('Delete site visit error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

module.exports = {
  getSiteVisits,
  createSiteVisit,
  updateSiteVisit,
  deleteSiteVisit
}