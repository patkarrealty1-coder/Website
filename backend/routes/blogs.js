const express = require('express')
const {
  getBlogs,
  getBlog,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getFeaturedBlogs,
  createPendingBlog
} = require('../controllers/blogController')

const { authenticate, authorize } = require('../middleware/auth')
const { uploadMultiple } = require('../middleware/upload')

const router = express.Router()

// Public routes
router.get('/', getBlogs)
router.get('/featured', getFeaturedBlogs)
router.get('/slug/:slug', getBlogBySlug)
router.get('/:id', getBlog)
router.post('/pending', createPendingBlog)

// Protected routes (Admin only)
router.post('/', authenticate, authorize('admin'), uploadMultiple, createBlog)
router.patch('/:id', authenticate, authorize('admin'), uploadMultiple, updateBlog)
router.put('/:id', authenticate, authorize('admin'), uploadMultiple, updateBlog)
router.delete('/:id', authenticate, authorize('admin'), deleteBlog)

module.exports = router
