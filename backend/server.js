const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const path = require('path')
require('dotenv').config()

const app = express()

// Security middleware
app.use(helmet())

// Rate limiting - More lenient for development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased limit for development
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
})
app.use('/api/', limiter)

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static files for uploaded images
app.use('/uploads', express.static('uploads'))

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/wishlist', require('./routes/wishlist'))
app.use('/api/properties', require('./routes/properties'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/blogs', require('./routes/blogs'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/setup', require('./routes/setup'))
app.use('/api/user', require('./routes/user'))
app.use('/api/sitevisits', require('./routes/sitevisits'))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Patkar\'s Realty API is running',
    timestamp: new Date().toISOString(),
    port: PORT,
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  })
})

// Debug endpoint for testing
app.get('/api/debug', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is working!',
    routes: {
      auth: 'Available',
      wishlist: 'Available',
      properties: 'Available'
    },
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  })
})

// Debug endpoint to check all users' wishlists
app.get('/api/debug/wishlists', async (req, res) => {
  try {
    const User = require('./models/User')
    const users = await User.find({}, 'email wishlist').populate('wishlist', 'title price')
    res.json({
      success: true,
      count: users.length,
      users: users.map(u => ({
        email: u.email,
        wishlistCount: u.wishlist.length,
        wishlist: u.wishlist
      }))
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  })
})

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
  })
} else {
  // 404 handler for development
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' })
  })
}

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patkars-realty')
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ Database connection error:', error)
    process.exit(1)
  }
}

// Start server
const PORT = parseInt(process.env.PORT, 10) || 4000
const startServer = async () => {
  await connectDB()
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`)
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`🔗 API Health: http://localhost:${PORT}/api/health`)
    console.log(`🔗 API Debug: http://localhost:${PORT}/api/debug`)
  })
}

startServer()

module.exports = app
