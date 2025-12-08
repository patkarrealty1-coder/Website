const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({ path: './backend/.env' })

const app = express()
app.use(express.json())

// Test MongoDB connection
const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Connected Successfully')
    
    // Test server
    const PORT = process.env.PORT || 4000
    app.get('/test', (req, res) => {
      res.json({ 
        success: true, 
        message: 'Backend is working!',
        mongodb: 'Connected',
        port: PORT
      })
    })
    
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`)
      console.log(`Test URL: http://localhost:${PORT}/test`)
      
      // Auto-close after 5 seconds for testing
      setTimeout(() => {
        console.log('✅ Test completed - Backend is working!')
        server.close()
        process.exit(0)
      }, 5000)
    })
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

testConnection()