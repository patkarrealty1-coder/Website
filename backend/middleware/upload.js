const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = uploadsDir
    
    // Create subdirectories based on file type
    if (file.fieldname === 'propertyImages') {
      uploadPath = path.join(uploadsDir, 'properties')
    } else if (file.fieldname === 'avatar') {
      uploadPath = path.join(uploadsDir, 'avatars')
    } else if (file.fieldname === 'documents') {
      uploadPath = path.join(uploadsDir, 'documents')
    }
    
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname)
    const baseName = path.basename(file.originalname, extension)
    
    // Sanitize filename
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_')
    
    cb(null, `${sanitizedBaseName}_${uniqueSuffix}${extension}`)
  }
})

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type based on fieldname
  if (file.fieldname === 'propertyImages' || file.fieldname === 'avatar') {
    // Only allow images
    if (file.mimetype.startsWith('image/')) {
      // Check specific image types
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(new Error('Only JPEG, PNG, and WebP images are allowed'), false)
      }
    } else {
      cb(new Error('Only image files are allowed'), false)
    }
  } else if (file.fieldname === 'documents') {
    // Allow documents
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ]
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF, DOC, DOCX, and image files are allowed for documents'), false)
    }
  } else {
    cb(new Error('Unexpected field'), false)
  }
}

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 20 // Maximum 20 files
  }
})

// Middleware for property images
const uploadPropertyImages = upload.array('propertyImages', 10)

// Middleware for single avatar
const uploadAvatar = upload.single('avatar')

// Middleware for documents
const uploadDocuments = upload.array('documents', 5)

// Middleware for multiple file types
const uploadMultiple = upload.fields([
  { name: 'propertyImages', maxCount: 10 },
  { name: 'documents', maxCount: 5 }
])

// Error handling middleware for multer
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB per file.'
      })
    } else if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum allowed files exceeded.'
      })
    } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected field name in file upload.'
      })
    } else {
      return res.status(400).json({
        success: false,
        message: `Upload error: ${error.message}`
      })
    }
  } else if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
  next()
}

// Helper function to delete file
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return true
    }
    return false
  } catch (error) {
    console.error('Error deleting file:', error)
    return false
  }
}

// Helper function to delete multiple files
const deleteFiles = (filePaths) => {
  const results = []
  filePaths.forEach(filePath => {
    results.push(deleteFile(filePath))
  })
  return results
}

// Middleware to clean up files on error
const cleanupOnError = (req, res, next) => {
  const originalSend = res.send
  
  res.send = function(data) {
    // If there's an error and files were uploaded, clean them up
    if (res.statusCode >= 400 && req.files) {
      const filesToDelete = []
      
      if (Array.isArray(req.files)) {
        // Single field with multiple files
        req.files.forEach(file => {
          filesToDelete.push(file.path)
        })
      } else if (typeof req.files === 'object') {
        // Multiple fields
        Object.keys(req.files).forEach(fieldname => {
          req.files[fieldname].forEach(file => {
            filesToDelete.push(file.path)
          })
        })
      }
      
      if (req.file) {
        filesToDelete.push(req.file.path)
      }
      
      if (filesToDelete.length > 0) {
        deleteFiles(filesToDelete)
      }
    }
    
    originalSend.call(this, data)
  }
  
  next()
}

// Validate uploaded images
const validateImages = (req, res, next) => {
  const files = req.files || (req.file ? [req.file] : [])
  
  if (files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'At least one image is required'
    })
  }
  
  // Additional validation can be added here
  // e.g., check image dimensions, file integrity, etc.
  
  next()
}

// Generate file URL
const generateFileUrl = (req, filename, subfolder = '') => {
  const baseUrl = `${req.protocol}://${req.get('host')}`
  const filePath = subfolder ? `uploads/${subfolder}/${filename}` : `uploads/${filename}`
  return `${baseUrl}/${filePath}`
}

// Process uploaded files to generate URLs
const processUploadedFiles = (req, res, next) => {
  if (req.files) {
    if (Array.isArray(req.files)) {
      // Single field with multiple files
      req.uploadedFiles = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        url: generateFileUrl(req, file.filename, path.basename(path.dirname(file.path)))
      }))
    } else if (typeof req.files === 'object') {
      // Multiple fields
      req.uploadedFiles = {}
      Object.keys(req.files).forEach(fieldname => {
        req.uploadedFiles[fieldname] = req.files[fieldname].map(file => ({
          filename: file.filename,
          originalName: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
          url: generateFileUrl(req, file.filename, path.basename(path.dirname(file.path)))
        }))
      })
    }
  }
  
  if (req.file) {
    req.uploadedFile = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: generateFileUrl(req, req.file.filename, path.basename(path.dirname(req.file.path)))
    }
  }
  
  next()
}

module.exports = {
  upload,
  uploadPropertyImages,
  uploadAvatar,
  uploadDocuments,
  uploadMultiple,
  handleUploadError,
  cleanupOnError,
  validateImages,
  processUploadedFiles,
  deleteFile,
  deleteFiles,
  generateFileUrl
}