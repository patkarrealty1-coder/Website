const User = require('../models/User')
const Property = require('../models/Property')

// Get User Wishlist
const getWishlist = async (req, res) => {
  try {
    // If no user is authenticated, return empty wishlist
    if (!req.user) {
      return res.json({
        success: true,
        count: 0,
        data: [],
        message: 'Please login to view your wishlist'
      })
    }

    const user = await User.findById(req.user.id).populate('wishlist')
    
    // Filter out any null or invalid properties
    const validWishlist = user.wishlist.filter(property => property != null)
    
    console.log(`User ${req.user.id} has ${validWishlist.length} properties in wishlist`)

    res.json({
      success: true,
      count: validWishlist.length,
      data: validWishlist
    })
  } catch (error) {
    console.error('Get wishlist error:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Add Property to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params

    // If no user is authenticated, prompt to login
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Please login to add properties to your wishlist'
      })
    }

    // Check if property exists
    const property = await Property.findById(propertyId)
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      })
    }

    const user = await User.findById(req.user.id)

    // Check if already in wishlist
    if (user.wishlist.includes(propertyId)) {
      return res.status(400).json({
        success: false,
        message: 'Property already in wishlist'
      })
    }

    await user.addToWishlist(propertyId)

    // Get updated wishlist with populated data
    const updatedUser = await User.findById(req.user.id).populate('wishlist')

    res.json({
      success: true,
      message: 'Property added to wishlist',
      data: {
        wishlist: updatedUser.wishlist,
        wishlistCount: updatedUser.wishlist.length
      }
    })
  } catch (error) {
    console.error('Add to wishlist error:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Remove Property from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params

    // If no user is authenticated, prompt to login
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Please login to manage your wishlist'
      })
    }

    const user = await User.findById(req.user.id)

    // Check if property is in wishlist
    if (!user.wishlist.includes(propertyId)) {
      return res.status(400).json({
        success: false,
        message: 'Property not in wishlist'
      })
    }

    await user.removeFromWishlist(propertyId)

    // Get updated wishlist with populated data
    const updatedUser = await User.findById(req.user.id).populate('wishlist')

    res.json({
      success: true,
      message: 'Property removed from wishlist',
      data: {
        wishlist: updatedUser.wishlist,
        wishlistCount: updatedUser.wishlist.length
      }
    })
  } catch (error) {
    console.error('Remove from wishlist error:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Toggle Wishlist (Add or Remove)
const toggleWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params

    // If no user is authenticated, prompt to login
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Please login to add properties to your wishlist'
      })
    }

    // Check if property exists
    const property = await Property.findById(propertyId)
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      })
    }

    const user = await User.findById(req.user.id)

    let message
    if (user.wishlist.includes(propertyId)) {
      await user.removeFromWishlist(propertyId)
      message = 'Property removed from wishlist'
    } else {
      await user.addToWishlist(propertyId)
      message = 'Property added to wishlist'
    }

    // Get updated wishlist with populated data
    const updatedUser = await User.findById(req.user.id).populate('wishlist')

    res.json({
      success: true,
      message,
      data: {
        wishlist: updatedUser.wishlist,
        wishlistCount: updatedUser.wishlist.length,
        isInWishlist: updatedUser.wishlist.some(p => p._id.toString() === propertyId)
      }
    })
  } catch (error) {
    console.error('Toggle wishlist error:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Clear Wishlist
const clearWishlist = async (req, res) => {
  try {
    // If no user is authenticated, prompt to login
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Please login to manage your wishlist'
      })
    }

    const user = await User.findById(req.user.id)
    user.wishlist = []
    await user.save()

    res.json({
      success: true,
      message: 'Wishlist cleared successfully',
      data: {
        wishlist: [],
        wishlistCount: 0
      }
    })
  } catch (error) {
    console.error('Clear wishlist error:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist
}
