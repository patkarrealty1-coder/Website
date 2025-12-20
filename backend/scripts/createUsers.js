const mongoose = require('mongoose')
const User = require('../models/User')
require('dotenv').config()

const createUsers = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patkars-realty', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB Connected')

        // Admin credentials
        const adminData = {
            fullName: 'Admin User',
            email: 'admin@patkarsrealty.com',
            password: 'admin123',
            role: 'admin',
            phone: '+919876543210',
            isEmailVerified: true
        }

        // Demo user credentials
        const userData = {
            fullName: 'Demo User',
            email: 'user@patkarsrealty.com',
            password: 'user123',
            role: 'user',
            phone: '+919876543211',
            isEmailVerified: true
        }

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminData.email })
        if (!existingAdmin) {
            await User.create(adminData)
            console.log('✅ Admin user created successfully!')
            console.log('Email:', adminData.email)
            console.log('Password: admin123')
        } else {
            console.log('ℹ️  Admin user already exists')
        }

        // Check if demo user already exists
        const existingUser = await User.findOne({ email: userData.email })
        if (!existingUser) {
            await User.create(userData)
            console.log('✅ Demo user created successfully!')
            console.log('Email:', userData.email)
            console.log('Password: user123')
        } else {
            console.log('ℹ️  Demo user already exists')
        }

        console.log('\n🚀 You can now login at: http://localhost:3000/login')
        console.log('\n📋 Login Credentials:')
        console.log('Admin: admin@patkarsrealty.com / admin123')
        console.log('User:  user@patkarsrealty.com / user123')

        process.exit(0)
    } catch (error) {
        console.error('❌ Error creating users:', error)
        process.exit(1)
    }
}

createUsers()