const express = require('express')
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController')

const { authenticate, authorize } = require('../middleware/auth')
const { uploadMultiple } = require('../middleware/upload')

const router = express.Router()

router.get('/', getProjects)
router.get('/:id', getProject)
router.post('/', authenticate, authorize('admin'), uploadMultiple, createProject)
router.put('/:id', authenticate, authorize('admin'), uploadMultiple, updateProject)
router.delete('/:id', authenticate, authorize('admin'), deleteProject)

module.exports = router
