const User = require('../models/User')
const Property = require('../models/Property')
const Contact = require('../models/Contact')

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    const { period = '30' } = req.query
    const days = parseInt(period)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get basic counts
    const [
      totalUsers,
      totalProperties,
      totalContacts,
      activeProperties,
      featuredProperties,
      newUsersCount,
      newPropertiesCount,
      newContactsCount
    ] = await Promise.all([
      User.countDocuments(),
      Property.countDocuments(),
      Contact.countDocuments(),
      Property.countDocuments({ status: 'active' }),
      Property.countDocuments({ featured: true }),
      User.countDocuments({ createdAt: { $gte: startDate } }),
      Property.countDocuments({ createdAt: { $gte: startDate } }),
      Contact.countDocuments({ createdAt: { $gte: startDate } })
    ])

    // Get user statistics
    const userStats = await User.getUserStats()

    // Get property statistics
    const propertyStats = await Property.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: '$price' },
          averagePrice: { $avg: '$price' },
          totalViews: { $sum: '$views' }
        }
      }
    ])

    // Get contact statistics
    const contactStats = await Contact.getContactStats(days)

    // Get recent activities
    const [recentUsers, recentProperties, recentContacts] = await Promise.all([
      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email role createdAt'),
      Property.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title price location.city status createdAt')
        .populate('agent', 'name'),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email subject status createdAt')
    ])

    // Get monthly data for charts
    const monthlyData = await Promise.all([
      // Users by month
      User.aggregate([
        {
          $match: { createdAt: { $gte: startDate } }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 }
        }
      ]),
      // Properties by month
      Property.aggregate([
        {
          $match: { createdAt: { $gte: startDate } }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 }
        }
      ]),
      // Contacts by month
      Contact.aggregate([
        {
          $match: { createdAt: { $gte: startDate } }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 }
        }
      ])
    ])

    // Get property type distribution
    const propertyTypeStats = await Property.aggregate([
      {
        $match: { status: 'active' }
      },
      {
        $group: {
          _id: '$propertyType',
          count: { $sum: 1 },
          averagePrice: { $avg: '$price' },
          totalValue: { $sum: '$price' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ])

    // Get top cities
    const topCities = await Property.aggregate([
      {
        $match: { status: 'active' }
      },
      {
        $group: {
          _id: '$location.city',
          count: { $sum: 1 },
          averagePrice: { $avg: '$price' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ])

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalProperties,
          totalContacts,
          activeProperties,
          featuredProperties,
          newUsers: newUsersCount,
          newProperties: newPropertiesCount,
          newContacts: newContactsCount
        },
        userStats,
        propertyStats: propertyStats[0] || {
          totalValue: 0,
          averagePrice: 0,
          totalViews: 0
        },
        contactStats,
        recentActivity: {
          users: recentUsers,
          properties: recentProperties,
          contacts: recentContacts
        },
        charts: {
          users: monthlyData[0],
          properties: monthlyData[1],
          contacts: monthlyData[2]
        },
        propertyTypeStats,
        topCities
      }
    })
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
const getUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      role,
      isActive,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query

    // Build query
    let query = {}
    if (role) query.role = role
    if (isActive !== undefined) query.isActive = isActive === 'true'

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }

    // Sorting
    const sortOptions = {}
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1

    // Pagination
    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    // Execute query
    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .select('-password')

    // Get total count
    const total = await User.countDocuments(query)

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      pagination: {
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      },
      data: users
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private (Admin)
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('savedProperties', 'title price location.city images')
      .populate('viewHistory', 'title price location.city images')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Get user's properties if they are an agent
    let userProperties = []
    if (user.role === 'agent' || user.role === 'admin') {
      userProperties = await Property.find({ agent: user._id })
        .select('title price location.city status createdAt')
    }

    res.status(200).json({
      success: true,
      data: {
        ...user.toObject(),
        properties: userProperties
      }
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Create user
// @route   POST /api/admin/users
// @access  Private (Admin)
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, isActive = true } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      })
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      phone,
      isActive,
      isEmailVerified: true // Admin created users are auto-verified
    })

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    })
  } catch (error) {
    console.error('Create user error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during user creation'
    })
  }
}

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private (Admin)
const updateUser = async (req, res) => {
  try {
    const { name, email, role, phone, isActive, isEmailVerified } = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        })
      }
    }

    // Update fields
    if (name) user.name = name
    if (email) user.email = email
    if (role) user.role = role
    if (phone) user.phone = phone
    if (isActive !== undefined) user.isActive = isActive
    if (isEmailVerified !== undefined) user.isEmailVerified = isEmailVerified

    await user.save()

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified
      }
    })
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during user update'
    })
  }
}

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Prevent deleting the last admin
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' })
      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete the last admin user'
        })
      }
    }

    // Check if user has properties
    const userProperties = await Property.countDocuments({ agent: user._id })
    if (userProperties > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete user with ${userProperties} properties. Please reassign or delete properties first.`
      })
    }

    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during user deletion'
    })
  }
}

// @desc    Toggle user status
// @route   PUT /api/admin/users/:id/toggle-status
// @access  Private (Admin)
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Prevent deactivating the last admin
    if (user.role === 'admin' && user.isActive) {
      const activeAdminCount = await User.countDocuments({ 
        role: 'admin', 
        isActive: true 
      })
      if (activeAdminCount <= 1) {
        return res.status(400).json({
          success: false,
          message: 'Cannot deactivate the last active admin user'
        })
      }
    }

    user.isActive = !user.isActive
    await user.save()

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: {
        id: user._id,
        isActive: user.isActive
      }
    })
  } catch (error) {
    console.error('Toggle user status error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Reset user password
// @route   PUT /api/admin/users/:id/reset-password
// @access  Private (Admin)
const resetUserPassword = async (req, res) => {
  try {
    const { newPassword } = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    user.password = newPassword
    await user.save()

    res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    })
  } catch (error) {
    console.error('Reset user password error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during password reset'
    })
  }
}

// @desc    Get system settings
// @route   GET /api/admin/settings
// @access  Private (Admin)
const getSystemSettings = async (req, res) => {
  try {
    // This would typically come from a settings collection
    // For now, return some basic system info
    const settings = {
      siteName: 'Real Estate Platform',
      siteDescription: 'Premium real estate listings and property management',
      contactEmail: process.env.ADMIN_EMAIL || 'admin@realestate.com',
      maintenanceMode: false,
      registrationEnabled: true,
      emailVerificationRequired: true,
      maxFileSize: '10MB',
      allowedFileTypes: ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'doc', 'docx'],
      featuredPropertiesLimit: 6,
      propertiesPerPage: 12
    }

    res.status(200).json({
      success: true,
      data: settings
    })
  } catch (error) {
    console.error('Get system settings error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Update system settings
// @route   PUT /api/admin/settings
// @access  Private (Admin)
const updateSystemSettings = async (req, res) => {
  try {
    const settings = req.body

    // In a real application, you would save these to a database
    // For now, just return success
    
    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    })
  } catch (error) {
    console.error('Update system settings error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get system logs
// @route   GET /api/admin/logs
// @access  Private (Admin)
const getSystemLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50, level, startDate, endDate } = req.query

    // This would typically come from a logging system
    // For now, return mock data
    const logs = [
      {
        id: '1',
        timestamp: new Date(),
        level: 'info',
        message: 'User logged in',
        userId: 'user123',
        ip: '192.168.1.1'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 3600000),
        level: 'error',
        message: 'Failed to upload image',
        userId: 'user456',
        ip: '192.168.1.2'
      }
    ]

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    })
  } catch (error) {
    console.error('Get system logs error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

module.exports = {
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
}