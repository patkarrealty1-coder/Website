const express = require('express')
const User = require('../models/User')
const router = express.Router()

// @route   POST /api/setup/create-admin
// @desc    Create initial admin user (should be disabled in production)
// @access  Public (only works if no admin exists)
router.post('/create-admin', async (req, res) => {
  try {
    // Check if any admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' })
    
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin user already exists. Please use login credentials.'
      })
    }

    // Create default admin
    const adminData = {
      fullName: 'Admin User',
      email: 'admin@patkarsrealty.com',
      password: 'admin123',
      role: 'admin',
      phone: '+919876543210',
      isActive: true
    }

    const admin = await User.create(adminData)

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully!',
      credentials: {
        email: 'admin@patkarsrealty.com',
        password: 'admin123'
      }
    })
  } catch (error) {
    console.error('Create admin error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating admin user',
      error: error.message
    })
  }
})

module.exports = router
