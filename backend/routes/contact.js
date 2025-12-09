const express = require('express')
const {
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
} = require('../controllers/contactController')

const {
  authenticate,
  authorize,
  adminOnly,
  adminOrAgent
} = require('../middleware/auth')

const {
  validateContact,
  validateObjectId,
  handleValidationErrors
} = require('../middleware/validation')

const router = express.Router()

// Public routes

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/',
  validateContact,
  handleValidationErrors,
  submitContact
)

// Private routes (Admin/Agent)

// @route   GET /api/contact/stats
// @desc    Get contact statistics
// @access  Private (Admin/Agent)
router.get('/stats',
  authenticate,
  adminOrAgent,
  getContactStats
)

// @route   GET /api/contact/recent
// @desc    Get recent contacts
// @access  Private (Admin/Agent)
router.get('/recent',
  authenticate,
  adminOrAgent,
  getRecentContacts
)

// @route   GET /api/contact/analytics
// @desc    Get contact analytics
// @access  Private (Admin)
router.get('/analytics',
  authenticate,
  adminOnly,
  getContactAnalytics
)

// @route   GET /api/contact/export
// @desc    Export contacts
// @access  Private (Admin)
router.get('/export',
  authenticate,
  adminOnly,
  exportContacts
)

// @route   PUT /api/contact/bulk
// @desc    Bulk update contacts
// @access  Private (Admin)
router.put('/bulk',
  authenticate,
  adminOnly,
  bulkUpdateContacts
)

// @route   GET /api/contact
// @desc    Get all contacts
// @access  Private (Admin/Agent)
router.get('/',
  authenticate,
  adminOrAgent,
  getContacts
)

// @route   GET /api/contact/:id
// @desc    Get single contact
// @access  Private (Admin/Agent)
router.get('/:id',
  authenticate,
  adminOrAgent,
  validateObjectId('id'),
  handleValidationErrors,
  getContact
)

// @route   PUT /api/contact/:id/status
// @desc    Update contact status
// @access  Private (Admin/Agent)
router.put('/:id/status',
  authenticate,
  adminOrAgent,
  validateObjectId('id'),
  handleValidationErrors,
  updateContactStatus
)

// @route   PUT /api/contact/:id/assign
// @desc    Assign contact
// @access  Private (Admin)
router.put('/:id/assign',
  authenticate,
  adminOnly,
  validateObjectId('id'),
  handleValidationErrors,
  assignContact
)

// @route   POST /api/contact/:id/response
// @desc    Add response to contact
// @access  Private (Admin/Agent)
router.post('/:id/response',
  authenticate,
  adminOrAgent,
  validateObjectId('id'),
  handleValidationErrors,
  addResponse
)

// @route   POST /api/contact/:id/note
// @desc    Add note to contact
// @access  Private (Admin/Agent)
router.post('/:id/note',
  authenticate,
  adminOrAgent,
  validateObjectId('id'),
  handleValidationErrors,
  addNote
)

// @route   DELETE /api/contact/:id
// @desc    Delete contact
// @access  Private (Admin)
router.delete('/:id',
  authenticate,
  adminOnly,
  validateObjectId('id'),
  handleValidationErrors,
  deleteContact
)

module.exports = router