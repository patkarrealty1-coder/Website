const express = require('express')
const {
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
} = require('../controllers/propertyController')

const {
  authenticate,
  authorize,
  adminOrAgent,
  optionalAuth
} = require('../middleware/auth')

const {
  validateProperty,
  validateSearch,
  validateObjectId,
  handleValidationErrors
} = require('../middleware/validation')

const {
  uploadMultiple,
  handleUploadError,
  processUploadedFiles,
  cleanupOnError,
  validateImages
} = require('../middleware/upload')

const router = express.Router()

// @route   POST /api/properties/pending
// @desc    Create pending property from API
// @access  Public (or with API key)
router.post('/pending', createPendingProperty)

// @route   GET /api/properties/featured
// @desc    Get featured properties
// @access  Public
router.get('/featured', getFeaturedProperties)

// @route   GET /api/properties/search
// @desc    Search properties
// @access  Public
router.get('/search',
  validateSearch,
  searchProperties
)

// @route   GET /api/properties/stats
// @desc    Get property statistics
// @access  Public
router.get('/stats', getPropertyStats)

// @route   GET /api/properties/:id/similar
// @desc    Get similar properties
// @access  Public
router.get('/:id/similar',
  ...validateObjectId('id'),
  getSimilarProperties
)

// @route   GET /api/properties
// @desc    Get all properties
// @access  Public
router.get('/', getProperties)

// @route   GET /api/properties/:id
// @desc    Get single property
// @access  Public (with optional auth for view tracking)
router.get('/:id',
  ...validateObjectId('id'),
  optionalAuth,
  getProperty
)

// @route   POST /api/properties
// @desc    Create property
// @access  Private (Admin/Agent)
router.post('/',
  authenticate,
  adminOrAgent,
  cleanupOnError,
  uploadMultiple,
  handleUploadError,
  processUploadedFiles,
  validateImages,
  validateProperty,
  createProperty
)

// @route   PUT /api/properties/:id
// @desc    Update property
// @access  Private (Admin/Agent/Owner)
router.put('/:id',
  authenticate,
  adminOrAgent,
  ...validateObjectId('id'),
  cleanupOnError,
  uploadMultiple,
  handleUploadError,
  processUploadedFiles,
  validateProperty,
  updateProperty
)

// @route   DELETE /api/properties/:id
// @desc    Delete property
// @access  Private (Admin/Agent/Owner)
router.delete('/:id',
  authenticate,
  adminOrAgent,
  ...validateObjectId('id'),
  deleteProperty
)

module.exports = router