const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Protect routes - require authentication
const protect = async (req, res, next) => {
  try {
    let token

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.'
      })
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password')

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        })
      }

      if (!req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Your account has been deactivated'
        })
      }

      next()
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      })
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    })
  }
}

// Authorize specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      })
    }
    next()
  }
}

// Optional authentication - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
        req.user = await User.findById(decoded.id).select('-password')
      } catch (error) {
        // Token invalid, but continue without user
        req.user = null
      }
    }

    next()
  } catch (error) {
    next()
  }
}

// Alias for backward compatibility
const authenticate = protect

// Admin or Agent authorization
const adminOrAgent = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
  }

  if (req.user.role !== 'admin' && req.user.role !== 'agent') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin or Agent role required.'
    })
  }

  next()
}

// Admin only authorization
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.'
    })
  }

  next()
}

module.exports = { 
  protect, 
  authorize, 
  authenticate, 
  optionalAuth, 
  adminOrAgent,
  adminOnly
}
