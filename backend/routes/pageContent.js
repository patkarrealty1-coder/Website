const express = require('express')
const router = express.Router()
const PageContent = require('../models/PageContent')
const { protect, adminOnly } = require('../middleware/auth')

// Get page content by type (public)
router.get('/:pageType', async (req, res) => {
  try {
    const content = await PageContent.findOne({ pageType: req.params.pageType })
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Page content not found'
      })
    }

    res.json({
      success: true,
      data: content
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching page content',
      error: error.message
    })
  }
})

// Create or update page content (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { pageType, title, content, sections, faqs, contactInfo } = req.body

    let pageContent = await PageContent.findOne({ pageType })

    if (pageContent) {
      // Update existing
      pageContent.title = title
      pageContent.content = content
      pageContent.sections = sections
      pageContent.faqs = faqs
      pageContent.contactInfo = contactInfo
      pageContent.lastUpdated = Date.now()
      if (req.user) pageContent.updatedBy = req.user._id
      
      await pageContent.save()
    } else {
      // Create new
      pageContent = await PageContent.create({
        pageType,
        title,
        content,
        sections,
        faqs,
        contactInfo,
        updatedBy: req.user?._id
      })
    }

    res.json({
      success: true,
      data: pageContent,
      message: 'Page content saved successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving page content',
      error: error.message
    })
  }
})

// Get all page types (admin only)
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const pages = await PageContent.find().select('pageType title lastUpdated')
    
    res.json({
      success: true,
      data: pages
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pages',
      error: error.message
    })
  }
})

module.exports = router
