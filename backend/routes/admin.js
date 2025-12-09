const express = require('express')
const {
  getDashboardStats,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  resetUserPassword,
  getSystemSettings,
  updateSystemSettings,
  getSystemLogs
} = require('../controllers/adminController')

const {
  authenticate,
  adminOnly
} = require('../middleware/auth')

const {
  validateUserUpdate,
  validateObjectId,
  handleValidationErrors
} = require('../middleware/validation')

const router = express.Router()

// All admin routes require authentication and admin role
router.use(authenticate)
router.use(adminOnly)

// Dashboard routes

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private (Admin)
router.get('/dashboard', getDashboardStats)

// User management routes

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin)
router.get('/users', getUsers)

// @route   GET /api/admin/users/:id
// @desc    Get single user
// @access  Private (Admin)
router.get('/users/:id',
  ...validateObjectId('id'),
  getUser
)

// @route   POST /api/admin/users
// @desc    Create user
// @access  Private (Admin)
router.post('/users',
  validateUserUpdate,
  createUser
)

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private (Admin)
router.put('/users/:id',
  ...validateObjectId('id'),
  validateUserUpdate,
  updateUser
)

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private (Admin)
router.delete('/users/:id',
  ...validateObjectId('id'),
  deleteUser
)

// @route   PUT /api/admin/users/:id/toggle-status
// @desc    Toggle user status
// @access  Private (Admin)
router.put('/users/:id/toggle-status',
  ...validateObjectId('id'),
  toggleUserStatus
)

// @route   PUT /api/admin/users/:id/reset-password
// @desc    Reset user password
// @access  Private (Admin)
router.put('/users/:id/reset-password',
  ...validateObjectId('id'),
  resetUserPassword
)

// System settings routes

// @route   GET /api/admin/settings
// @desc    Get system settings
// @access  Private (Admin)
router.get('/settings', getSystemSettings)

// @route   PUT /api/admin/settings
// @desc    Update system settings
// @access  Private (Admin)
router.put('/settings', updateSystemSettings)

// System logs routes

// @route   GET /api/admin/logs
// @desc    Get system logs
// @access  Private (Admin)
router.get('/logs', getSystemLogs)

module.exports = router