const Contact = require('../models/Contact')
const Property = require('../models/Property')

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      propertyId,
      inquiryType = 'general',
      source = 'website'
    } = req.body

    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress
    const userAgent = req.get('User-Agent')

    // Prepare contact data
    const contactData = {
      name,
      email,
      phone,
      subject,
      message,
      inquiryType,
      source,
      ipAddress,
      userAgent
    }

    // If property inquiry, get property details
    if (propertyId) {
      const property = await Property.findById(propertyId)
      if (property) {
        contactData.property = {
          id: property._id,
          title: property.title,
          price: property.price,
          location: property.location
        }
        contactData.inquiryType = 'property'
      }
    }

    // Create contact entry
    const contact = await Contact.create(contactData)

    // TODO: Send notification email to admin/agent
    // TODO: Send confirmation email to user

    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry. We will get back to you soon!',
      data: {
        id: contact._id,
        submittedAt: contact.createdAt
      }
    })
  } catch (error) {
    console.error('Submit contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit your inquiry. Please try again later.'
    })
  }
}

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private (Admin/Agent)
const getContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      inquiryType,
      priority,
      assignedTo,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      dateFrom,
      dateTo
    } = req.query

    // Build query
    let query = {}

    // Filters
    if (status) query.status = status
    if (inquiryType) query.inquiryType = inquiryType
    if (priority) query.priority = priority
    if (assignedTo) query.assignedTo = assignedTo

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ]
    }

    // Date range filter
    if (dateFrom || dateTo) {
      query.createdAt = {}
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom)
      if (dateTo) query.createdAt.$lte = new Date(dateTo)
    }

    // Sorting
    const sortOptions = {}
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1

    // Pagination
    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    // Execute query
    const contacts = await Contact.find(query)
      .populate('assignedTo', 'name email')
      .populate('property.id', 'title price location')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)

    // Get total count
    const total = await Contact.countDocuments(query)

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      pagination: {
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      },
      data: contacts
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private (Admin/Agent)
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name email phone')
      .populate('property.id', 'title price location images')

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    // Mark as read if not already
    if (!contact.isRead) {
      await contact.markAsRead()
    }

    res.status(200).json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Get contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Update contact status
// @route   PUT /api/contact/:id/status
// @access  Private (Admin/Agent)
const updateContactStatus = async (req, res) => {
  try {
    const { status, priority } = req.body

    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    if (status) contact.status = status
    if (priority) contact.priority = priority

    await contact.save()

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    })
  } catch (error) {
    console.error('Update contact status error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Assign contact to user
// @route   PUT /api/contact/:id/assign
// @access  Private (Admin)
const assignContact = async (req, res) => {
  try {
    const { userId } = req.body

    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    await contact.assignTo(userId)

    await contact.populate('assignedTo', 'name email')

    res.status(200).json({
      success: true,
      message: 'Contact assigned successfully',
      data: contact
    })
  } catch (error) {
    console.error('Assign contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Add response to contact
// @route   POST /api/contact/:id/response
// @access  Private (Admin/Agent)
const addResponse = async (req, res) => {
  try {
    const { message, method = 'email' } = req.body

    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    await contact.addResponse(message, req.user.id, method)

    res.status(200).json({
      success: true,
      message: 'Response added successfully',
      data: contact
    })
  } catch (error) {
    console.error('Add response error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Add note to contact
// @route   POST /api/contact/:id/note
// @access  Private (Admin/Agent)
const addNote = async (req, res) => {
  try {
    const { note } = req.body

    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    await contact.addNote(note, req.user.id)

    res.status(200).json({
      success: true,
      message: 'Note added successfully',
      data: contact
    })
  } catch (error) {
    console.error('Add note error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    await Contact.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    })
  } catch (error) {
    console.error('Delete contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private (Admin/Agent)
const getContactStats = async (req, res) => {
  try {
    const { period = '30' } = req.query
    const days = parseInt(period)

    const stats = await Contact.getContactStats(days)

    res.status(200).json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Get contact stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get recent contacts
// @route   GET /api/contact/recent
// @access  Private (Admin/Agent)
const getRecentContacts = async (req, res) => {
  try {
    const { limit = 10 } = req.query

    const contacts = await Contact.getRecentContacts(parseInt(limit))

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    })
  } catch (error) {
    console.error('Get recent contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get contact analytics
// @route   GET /api/contact/analytics
// @access  Private (Admin)
const getContactAnalytics = async (req, res) => {
  try {
    const { period = '30' } = req.query
    const days = parseInt(period)

    const analytics = await Contact.getContactAnalytics(days)

    res.status(200).json({
      success: true,
      data: analytics
    })
  } catch (error) {
    console.error('Get contact analytics error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Bulk update contacts
// @route   PUT /api/contact/bulk
// @access  Private (Admin)
const bulkUpdateContacts = async (req, res) => {
  try {
    const { contactIds, updates } = req.body

    if (!contactIds || !Array.isArray(contactIds) || contactIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Contact IDs are required'
      })
    }

    const result = await Contact.updateMany(
      { _id: { $in: contactIds } },
      updates
    )

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} contacts updated successfully`,
      data: {
        matched: result.matchedCount,
        modified: result.modifiedCount
      }
    })
  } catch (error) {
    console.error('Bulk update contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Export contacts
// @route   GET /api/contact/export
// @access  Private (Admin)
const exportContacts = async (req, res) => {
  try {
    const {
      format = 'json',
      status,
      inquiryType,
      dateFrom,
      dateTo
    } = req.query

    // Build query
    let query = {}
    if (status) query.status = status
    if (inquiryType) query.inquiryType = inquiryType
    if (dateFrom || dateTo) {
      query.createdAt = {}
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom)
      if (dateTo) query.createdAt.$lte = new Date(dateTo)
    }

    const contacts = await Contact.find(query)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .lean()

    if (format === 'csv') {
      // TODO: Implement CSV export
      return res.status(501).json({
        success: false,
        message: 'CSV export not implemented yet'
      })
    }

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
      exportedAt: new Date()
    })
  } catch (error) {
    console.error('Export contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

module.exports = {
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  assignContact,
  addResponse,
  addNote,
  deleteContact,
  getContactStats,
  getRecentContacts,
  getContactAnalytics,
  bulkUpdateContacts,
  exportContacts
}