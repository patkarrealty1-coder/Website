const User = require('../models/User')
const Property = require('../models/Property')
const SiteVisit = require('../models/SiteVisit')

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('wishlist', 'title price location propertyType images')
      .select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Get user profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      bio,
      profileImage,
      preferences
    } = req.body

    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Update fields
    if (fullName) user.fullName = fullName
    if (phone) user.phone = phone
    if (bio !== undefined) user.bio = bio
    if (profileImage) user.profileImage = profileImage
    if (preferences) user.preferences = preferences

    await user.save()

    // Return updated user without password
    const updatedUser = await User.findById(req.user.id).select('-password')

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    })
  } catch (error) {
    console.error('Update user profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get user insights/analytics
// @route   GET /api/user/insights
// @access  Private
const getUserInsights = async (req, res) => {
  try {
    const userId = req.user.id

    // Get user's wishlist properties for analysis
    const user = await User.findById(userId).populate('wishlist')
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const wishlistProperties = user.wishlist

    // Calculate insights
    const insights = {
      totalWishlistItems: wishlistProperties.length,
      mostPreferredLocations: [],
      commonPropertyTypes: [],
      averagePriceRange: {
        min: 0,
        max: 0,
        average: 0
      },
      totalSiteVisits: 0,
      completedVisits: 0,
      plannedVisits: 0
    }

    if (wishlistProperties.length > 0) {
      // Analyze locations
      const locationCounts = {}
      wishlistProperties.forEach(property => {
        const city = property.location?.city
        if (city) {
          locationCounts[city] = (locationCounts[city] || 0) + 1
        }
      })
      
      insights.mostPreferredLocations = Object.entries(locationCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([location, count]) => ({ location, count }))

      // Analyze property types
      const typeCounts = {}
      wishlistProperties.forEach(property => {
        const type = property.propertyType
        if (type) {
          typeCounts[type] = (typeCounts[type] || 0) + 1
        }
      })
      
      insights.commonPropertyTypes = Object.entries(typeCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([type, count]) => ({ type, count }))

      // Analyze price range
      const prices = wishlistProperties.map(p => p.price).filter(p => p > 0)
      if (prices.length > 0) {
        insights.averagePriceRange = {
          min: Math.min(...prices),
          max: Math.max(...prices),
          average: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
        }
      }
    }

    // Get site visit statistics
    const siteVisitStats = await SiteVisit.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])

    siteVisitStats.forEach(stat => {
      if (stat._id === 'completed') insights.completedVisits = stat.count
      if (stat._id === 'planned') insights.plannedVisits = stat.count
    })
    
    insights.totalSiteVisits = insights.completedVisits + insights.plannedVisits

    res.json({
      success: true,
      data: insights
    })
  } catch (error) {
    console.error('Get user insights error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserInsights
}