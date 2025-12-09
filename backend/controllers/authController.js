const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  })
}

// Register User
const register = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      })
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      phone
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        token
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists. Please use a different email.'
      })
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        success: false,
        message: messages.join('. ')
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error during registration. Please try again.'
    })
  }
}

// Login User
const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password')
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated'
      })
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password)
    
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token with different expiry based on rememberMe
    const tokenExpiry = rememberMe ? '30d' : '7d'
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: tokenExpiry
    })

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          profileImage: user.profileImage,
          wishlistCount: user.wishlist.length
        },
        token
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again.'
    })
  }
}

// Get Current User
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist')

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          profileImage: user.profileImage,
          wishlist: user.wishlist,
          wishlistCount: user.wishlist.length,
          createdAt: user.createdAt
        }
      }
    })
  } catch (error) {
    console.error('Get me error:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, profileImage } = req.body

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, phone, profileImage },
      { new: true, runValidators: true }
    )

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Change Password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    const user = await User.findById(req.user.id).select('+password')

    // Check current password
    const isPasswordCorrect = await user.comparePassword(currentPassword)
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      })
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.json({
      success: true,
      message: 'Password changed successfully'
    })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
}
