import * as yup from 'yup';
import { MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES, ALLOWED_DOCUMENT_TYPES } from './constants';

// Common validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE: /^[+]?[1-9][\d\s\-\(\)]{7,15}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PINCODE: /^[1-9][0-9]{5}$/,
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  AADHAR: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
};

// User Registration Schema
export const userRegistrationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .matches(VALIDATION_PATTERNS.EMAIL, 'Please enter a valid email address'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(VALIDATION_PATTERNS.PHONE, 'Please enter a valid phone number'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      VALIDATION_PATTERNS.PASSWORD,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  role: yup
    .string()
    .oneOf(['user', 'agent'], 'Please select a valid role')
    .default('user'),
});

// User Login Schema
export const userLoginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(VALIDATION_PATTERNS.EMAIL, 'Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Profile Update Schema
export const profileUpdateSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(VALIDATION_PATTERNS.PHONE, 'Please enter a valid phone number'),
  bio: yup
    .string()
    .max(500, 'Bio must not exceed 500 characters'),
  address: yup
    .string()
    .max(200, 'Address must not exceed 200 characters'),
});

// Password Change Schema
export const passwordChangeSchema = yup.object({
  currentPassword: yup
    .string()
    .required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      VALIDATION_PATTERNS.PASSWORD,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your new password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

// Forgot Password Schema
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(VALIDATION_PATTERNS.EMAIL, 'Please enter a valid email address'),
});

// Reset Password Schema
export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      VALIDATION_PATTERNS.PASSWORD,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

// Property Schema
export const propertySchema = yup.object({
  title: yup
    .string()
    .required('Property title is required')
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: yup
    .string()
    .required('Property description is required')
    .min(50, 'Description must be at least 50 characters')
    .max(2000, 'Description must not exceed 2000 characters'),
  type: yup
    .string()
    .required('Property type is required')
    .oneOf(['apartment', 'house', 'villa', 'studio', 'penthouse', 'duplex', 'commercial', 'land']),
  status: yup
    .string()
    .required('Property status is required')
    .oneOf(['sale', 'rent', 'sold', 'rented']),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be a positive number')
    .min(1000, 'Price must be at least ₹1,000'),
  area: yup
    .number()
    .required('Area is required')
    .positive('Area must be a positive number')
    .min(50, 'Area must be at least 50 sq ft'),
  bedrooms: yup
    .number()
    .required('Number of bedrooms is required')
    .integer('Bedrooms must be a whole number')
    .min(0, 'Bedrooms cannot be negative')
    .max(20, 'Maximum 20 bedrooms allowed'),
  bathrooms: yup
    .number()
    .required('Number of bathrooms is required')
    .integer('Bathrooms must be a whole number')
    .min(1, 'At least 1 bathroom is required')
    .max(20, 'Maximum 20 bathrooms allowed'),
  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must not exceed 200 characters'),
  city: yup
    .string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must not exceed 50 characters'),
  state: yup
    .string()
    .required('State is required')
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must not exceed 50 characters'),
  pincode: yup
    .string()
    .required('Pincode is required')
    .matches(VALIDATION_PATTERNS.PINCODE, 'Please enter a valid pincode'),
  features: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one feature'),
});

// Contact Form Schema
export const contactSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .matches(VALIDATION_PATTERNS.EMAIL, 'Please enter a valid email address'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(VALIDATION_PATTERNS.PHONE, 'Please enter a valid phone number'),
  subject: yup
    .string()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must not exceed 100 characters'),
  message: yup
    .string()
    .required('Message is required')
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
  inquiryType: yup
    .string()
    .required('Please select an inquiry type')
    .oneOf(['general', 'property', 'buying', 'selling', 'renting', 'investment', 'valuation', 'consultation']),
  propertyId: yup
    .string()
    .when('inquiryType', {
      is: 'property',
      then: (schema) => schema.required('Property ID is required for property inquiries'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

// Search Schema
export const searchSchema = yup.object({
  query: yup
    .string()
    .max(100, 'Search query must not exceed 100 characters'),
  type: yup
    .string()
    .oneOf(['apartment', 'house', 'villa', 'studio', 'penthouse', 'duplex', 'commercial', 'land', '']),
  status: yup
    .string()
    .oneOf(['sale', 'rent', '']),
  city: yup
    .string()
    .max(50, 'City must not exceed 50 characters'),
  minPrice: yup
    .number()
    .positive('Minimum price must be positive')
    .when('maxPrice', (maxPrice, schema) => {
      return maxPrice ? schema.max(maxPrice, 'Minimum price must be less than maximum price') : schema;
    }),
  maxPrice: yup
    .number()
    .positive('Maximum price must be positive')
    .when('minPrice', (minPrice, schema) => {
      return minPrice ? schema.min(minPrice, 'Maximum price must be greater than minimum price') : schema;
    }),
  bedrooms: yup
    .number()
    .integer('Bedrooms must be a whole number')
    .min(0, 'Bedrooms cannot be negative')
    .max(20, 'Maximum 20 bedrooms allowed'),
});

// File validation functions
export const validateFile = (file, type = 'image') => {
  const errors = [];

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push('File size is too large. Maximum allowed size is 5MB.');
  }

  // Check file type
  const allowedTypes = type === 'image' ? ALLOWED_IMAGE_TYPES : ALLOWED_DOCUMENT_TYPES;
  if (!allowedTypes.includes(file.type)) {
    errors.push(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateMultipleFiles = (files, type = 'image', maxFiles = 10) => {
  const errors = [];

  // Check number of files
  if (files.length > maxFiles) {
    errors.push(`Too many files. Maximum allowed: ${maxFiles}`);
  }

  // Validate each file
  files.forEach((file, index) => {
    const fileValidation = validateFile(file, type);
    if (!fileValidation.isValid) {
      errors.push(`File ${index + 1}: ${fileValidation.errors.join(', ')}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Custom validation functions
export const validateEmail = (email) => {
  return VALIDATION_PATTERNS.EMAIL.test(email);
};

export const validatePhone = (phone) => {
  return VALIDATION_PATTERNS.PHONE.test(phone);
};

export const validatePassword = (password) => {
  return VALIDATION_PATTERNS.PASSWORD.test(password);
};

export const validatePincode = (pincode) => {
  return VALIDATION_PATTERNS.PINCODE.test(pincode);
};

export const validatePAN = (pan) => {
  return VALIDATION_PATTERNS.PAN.test(pan);
};

export const validateAadhar = (aadhar) => {
  return VALIDATION_PATTERNS.AADHAR.test(aadhar);
};

// Form validation helper
export const validateForm = async (schema, data) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.inner.forEach((err) => {
      errors[err.path] = err.message;
    });
    return { isValid: false, errors };
  }
};

// Real-time field validation
export const validateField = async (schema, fieldName, value) => {
  try {
    await schema.validateAt(fieldName, { [fieldName]: value });
    return { isValid: true, error: null };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};