const mongoose = require('mongoose')
const User = require('../models/User')
require('dotenv').config()

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patkars-realty', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB Connected')

    // Admin credentials
    const adminData = {
      name: 'Admin User',
      email: 'admin@patkarsrealty.com',
      password: 'admin123',
      role: 'admin',
      phone: '+919876543210',
      isEmailVerified: true
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email })
    if (existingAdmin) {
      console.log('Admin user already exists!')
      console.log('Email:', adminData.email)
      console.log('Password: admin123')
      process.exit(0)
    }

    // Create admin user
    const admin = await User.create(adminData)
    console.log('Admin user created successfully!')
    console.log('Email:', adminData.email)
    console.log('Password: admin123')
    console.log('\nYou can now login at: http://localhost:3000/login')

    process.exit(0)
  } catch (error) {
    console.error('Error creating admin:', error)
    process.exit(1)
  }
}

createAdmin()
