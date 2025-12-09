const express = require('express')
const {
  getUserProfile,
  updateUserProfile,
  getUserInsights
} = require('../controllers/userController')
const { authenticate } = require('../middleware/auth')

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// User profile routes
router.get('/profile', getUserProfile)
router.put('/profile', updateUserProfile)
router.get('/insights', getUserInsights)

module.exports = router