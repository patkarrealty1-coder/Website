const { body, param, query, validationResult } = require('express-validator')

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }))
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages
    })
  }
  
  next()
}

// User validation rules
const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  handleValidationErrors
]

const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
]

// Property validation rules
const validateProperty = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Description must be between 20 and 2000 characters'),
  
  body('price')
    .isNumeric()
    .isFloat({ min: 1 })
    .withMessage('Price must be a positive number'),
  
  body('location.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  
  body('location.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  
  body('location.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  
  body('location.pincode')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('Pincode must be a 6-digit number'),
  
  body('propertyType')
    .isIn(['Apartment', 'Villa', 'House', 'Penthouse', 'Commercial', 'Plot', 'Other'])
    .withMessage('Invalid property type'),
  
  body('bedrooms')
    .isInt({ min: 0, max: 20 })
    .withMessage('Bedrooms must be a number between 0 and 20'),
  
  body('bathrooms')
    .isInt({ min: 0, max: 20 })
    .withMessage('Bathrooms must be a number between 0 and 20'),
  
  body('sqft')
    .isNumeric()
    .isFloat({ min: 1 })
    .withMessage('Square footage must be a positive number'),
  
  body('yearBuilt')
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() + 5 })
    .withMessage('Year built must be between 1800 and 5 years in the future'),
  
  body('listingAgent.name')
    .trim()
    .notEmpty()
    .withMessage('Agent name is required'),
  
  body('listingAgent.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Agent email must be valid'),
  
  body('listingAgent.phone')
    .isMobilePhone()
    .withMessage('Agent phone must be valid'),
  
  body('amenities')
    .optional()
    .isArray()
    .withMessage('Amenities must be an array'),
  
  body('amenities.*')
    .optional()
    .isIn([
      'Parking', 'WiFi', 'Gym', 'Security', 'Garden', 'Swimming Pool',
      'Elevator', 'Balcony', 'Air Conditioning', 'Heating', 'Furnished',
      'Pet Friendly', 'Laundry', 'Storage', 'Fireplace', 'Terrace',
      'Power Backup', 'Water Supply', 'Maintenance Staff', 'CCTV',
      'Intercom', 'Clubhouse', 'Playground', 'Jogging Track'
    ])
    .withMessage('Invalid amenity'),
  
  handleValidationErrors
]

// Contact form validation
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  body('propertyType')
    .optional()
    .isIn(['Apartment', 'Villa', 'House', 'Penthouse', 'Commercial', 'Plot', 'Other'])
    .withMessage('Invalid property type'),
  
  body('inquiryType')
    .optional()
    .isIn(['general', 'property_inquiry', 'viewing_request', 'selling_inquiry', 'investment_advice'])
    .withMessage('Invalid inquiry type'),
  
  handleValidationErrors
]

// Search validation
const validateSearch = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('minPrice')
    .optional()
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  
  query('maxPrice')
    .optional()
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  
  query('bedrooms')
    .optional()
    .custom((value) => {
      if (value === '4+') return true
      return Number.isInteger(parseInt(value)) && parseInt(value) >= 0
    })
    .withMessage('Bedrooms must be a positive integer or "4+"'),
  
  query('propertyType')
    .optional()
    .isIn(['All', 'Apartment', 'Villa', 'House', 'Penthouse', 'Commercial', 'Plot', 'Other'])
    .withMessage('Invalid property type'),
  
  query('sortBy')
    .optional()
    .isIn(['price_asc', 'price_desc', 'date_asc', 'date_desc', 'sqft_asc', 'sqft_desc'])
    .withMessage('Invalid sort option'),
  
  handleValidationErrors
]

// MongoDB ObjectId validation
const validateObjectId = (paramName = 'id') => [
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName} format`),
  
  handleValidationErrors
]

// Password reset validation
const validatePasswordReset = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  handleValidationErrors
]

const validateNewPassword = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match')
      }
      return true
    }),
  
  handleValidationErrors
]

// Update profile validation
const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('preferences.notifications.email')
    .optional()
    .isBoolean()
    .withMessage('Email notification preference must be boolean'),
  
  body('preferences.notifications.sms')
    .optional()
    .isBoolean()
    .withMessage('SMS notification preference must be boolean'),
  
  handleValidationErrors
]

// Admin validation for user management
const validateUserUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('role')
    .optional()
    .isIn(['admin', 'agent', 'user'])
    .withMessage('Invalid role'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be boolean'),
  
  handleValidationErrors
]

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateProperty,
  validateContact,
  validateSearch,
  validateObjectId,
  validatePasswordReset,
  validateNewPassword,
  validateProfileUpdate,
  validateUserUpdate,
  handleValidationErrors
}