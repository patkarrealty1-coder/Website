const User = require('../models/User')
const Customer = require('../models/Customer')
const Agent = require('../models/Agent')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// Helper to get the right model
const getModel = (userType) => {
  return userType === 'agent' ? Agent : Customer
}

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  })
}

// Register User
const register = async (req, res) => {
  try {
    const { fullName, email, password, phone, userType = 'customer' } = req.body

    const Model = getModel(userType)

    // Check if user already exists
    const existingUser = await Model.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `${userType === 'agent' ? 'Agent' : 'Customer'} already exists with this email`
      })
    }

    // Create user
    const user = await Model.create({
      fullName,
      email,
      password,
      phone
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: `${userType === 'agent' ? 'Agent' : 'Customer'} registered successfully`,
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          userType
        },
        token
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    
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
    const { email, password, rememberMe, userType = 'customer' } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }

    // Check if it's an admin login (User model)
    let user = await User.findOne({ email }).select('+password')
    let isAdmin = false
    
    if (user && user.role === 'admin') {
      isAdmin = true
    } else {
      // Not admin, check Customer/Agent models
      const Model = getModel(userType)
      user = await Model.findOne({ email }).select('+password')
    }
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Check if user signed up with Google (not applicable for admin)
    if (!isAdmin && user.authProvider === 'google') {
      return res.status(400).json({
        success: false,
        message: 'This account uses Google Sign-In. Please use the Google button to login.'
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
    const actualUserType = isAdmin ? 'admin' : userType
    const token = jwt.sign({ id: user._id, userType: actualUserType }, process.env.JWT_SECRET || 'your-secret-key', {
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
          userType: actualUserType,
          role: user.role || actualUserType,
          profileImage: user.profileImage,
          wishlistCount: user.wishlist?.length || 0
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

// Google OAuth Login/Register
const googleAuth = async (req, res) => {
  try {
    const { credential, userType = 'customer' } = req.body

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential is required'
      })
    }

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()
    const { sub: googleId, email, name, picture } = payload

    const Model = getModel(userType)

    // Check if user exists
    let user = await Model.findOne({ 
      $or: [{ googleId }, { email }] 
    })

    if (user) {
      // Update existing user
      if (!user.googleId) {
        user.googleId = googleId
        user.authProvider = 'google'
      }
      if (picture && !user.profileImage) {
        user.profileImage = picture
      }
      user.lastLogin = new Date()
      await user.save()
    } else {
      // Create new user
      user = await Model.create({
        fullName: name,
        email,
        googleId,
        authProvider: 'google',
        profileImage: picture || '',
        lastLogin: new Date()
      })
    }

    // Generate token
    const token = jwt.sign({ id: user._id, userType }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '30d'
    })

    res.json({
      success: true,
      message: user.createdAt === user.updatedAt ? 'Account created successfully' : 'Login successful',
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          userType,
          profileImage: user.profileImage,
          wishlistCount: user.wishlist?.length || 0
        },
        token
      }
    })
  } catch (error) {
    console.error('Google auth error:', error)
    res.status(500).json({
      success: false,
      message: 'Google authentication failed. Please try again.'
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
  googleAuth,
  getMe,
  updateProfile,
  changePassword
}
