const Project = require('../models/Project')

// Get all projects
const getProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, featured } = req.query
    
    const query = { isActive: true }
    if (status) query.status = status
    if (featured !== undefined) query.featured = featured === 'true'
    
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
    
    const total = await Project.countDocuments(query)
    
    res.json({
      success: true,
      data: projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get single project
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }
    
    res.json({ success: true, data: project })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Create project
const createProject = async (req, res) => {
  try {
    const projectData = { ...req.body }
    
    if (req.uploadedFiles && req.uploadedFiles.image) {
      projectData.image = {
        url: req.uploadedFiles.image[0].url,
        publicId: req.uploadedFiles.image[0].filename,
        alt: req.body.name
      }
    }
    
    if (req.uploadedFiles && req.uploadedFiles.gallery) {
      projectData.gallery = req.uploadedFiles.gallery.map(file => ({
        url: file.url,
        publicId: file.filename,
        caption: ''
      }))
    }
    
    const project = await Project.create(projectData)
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Update project
const updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id)
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }
    
    if (req.uploadedFiles && req.uploadedFiles.image) {
      req.body.image = {
        url: req.uploadedFiles.image[0].url,
        publicId: req.uploadedFiles.image[0].filename,
        alt: req.body.name || project.name
      }
    }
    
    if (req.uploadedFiles && req.uploadedFiles.gallery) {
      const newGallery = req.uploadedFiles.gallery.map(file => ({
        url: file.url,
        publicId: file.filename,
        caption: ''
      }))
      req.body.gallery = [...(project.gallery || []), ...newGallery]
    }
    
    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    
    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Delete project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }
    
    await Project.findByIdAndDelete(req.params.id)
    
    res.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
}
