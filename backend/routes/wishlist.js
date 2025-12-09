const express = require('express')
const router = express.Router()
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist
} = require('../controllers/wishlistController')
const { optionalAuth } = require('../middleware/auth')

// Use optional auth - works with or without login
router.get('/', optionalAuth, getWishlist)
router.post('/:propertyId', optionalAuth, addToWishlist)
router.delete('/:propertyId', optionalAuth, removeFromWishlist)
router.put('/toggle/:propertyId', optionalAuth, toggleWishlist)
router.delete('/', optionalAuth, clearWishlist)

module.exports = router
