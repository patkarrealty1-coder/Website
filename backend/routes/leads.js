const express = require('express')
const router = express.Router()
const Lead = require('../models/Lead')

// Create new lead (public - from form submission)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, propertyType, budgetRange, preferredLocality } = req.body
    
    const lead = new Lead({
      name,
      email,
      phone,
      propertyType,
      budgetRange,
      preferredLocality,
      source: 'website-form',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      utmSource: req.query.utm_source,
      utmMedium: req.query.utm_medium,
      utmCampaign: req.query.utm_campaign
    })
    
    await lead.save()
    res.status(201).json({ 
      success: true, 
      message: 'Thank you! We will contact you within 24 hours.',
      data: { id: lead._id }
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// Get all leads with filters (admin)
router.get('/', async (req, res) => {
  try {
    const { 
      status, 
      priority,
      locality,
      budget,
      assignedTo,
      sort = '-createdAt',
      page = 1,
      limit = 20
    } = req.query
    
    const filter = {}
    if (status && status !== 'all') filter.status = status
    if (priority) filter.priority = priority
    if (locality) filter.preferredLocality = locality
    if (budget) filter.budgetRange = budget
    if (assignedTo) filter.assignedTo = assignedTo
    
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate('assignedTo', 'fullName email')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Lead.countDocuments(filter)
    ])
    
    res.json({ 
      success: true, 
      data: leads,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get lead stats (admin)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Lead.getLeadStats()
    const byLocality = await Lead.getLeadsByLocality()
    const byBudget = await Lead.getLeadsByBudget()
    
    res.json({ 
      success: true, 
      data: { ...stats, byLocality, byBudget }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get single lead (admin)
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedTo', 'fullName email')
      .populate('notes.addedBy', 'fullName')
      .populate('convertedProperty', 'title price')
    
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }
    
    res.json({ success: true, data: lead })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update lead (admin)
router.patch('/:id', async (req, res) => {
  try {
    const allowedUpdates = [
      'status', 'priority', 'assignedTo', 'followUpDate', 
      'lastContactedAt', 'convertedProperty', 'dealValue'
    ]
    
    const updates = {}
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key]
      }
    })
    
    // Auto-set convertedAt when status changes to converted
    if (updates.status === 'converted') {
      updates.convertedAt = new Date()
    }
    
    const lead = await Lead.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true, runValidators: true }
    )
    
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }
    
    res.json({ success: true, data: lead })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// Add note to lead (admin)
router.post('/:id/notes', async (req, res) => {
  try {
    const { message, addedBy } = req.body
    
    const lead = await Lead.findById(req.params.id)
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }
    
    await lead.addNote(message, addedBy)
    res.json({ success: true, data: lead })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// Delete lead (admin)
router.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id)
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }
    res.json({ success: true, message: 'Lead deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Bulk update leads (admin)
router.patch('/bulk/update', async (req, res) => {
  try {
    const { ids, updates } = req.body
    
    await Lead.updateMany(
      { _id: { $in: ids } },
      { $set: updates }
    )
    
    res.json({ success: true, message: `${ids.length} leads updated` })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

module.exports = router
