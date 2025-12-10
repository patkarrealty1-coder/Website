// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Application Constants
export const APP_NAME = "Patkar's Realty";
export const APP_DESCRIPTION = "Your Trusted Real Estate Partner";
export const APP_VERSION = "1.0.0";

// Property Types
export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'studio', label: 'Studio' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land' }
];

// Property Status
export const PROPERTY_STATUS = [
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
  { value: 'sold', label: 'Sold' },
  { value: 'rented', label: 'Rented' }
];

// Property Features
export const PROPERTY_FEATURES = [
  'Air Conditioning',
  'Balcony',
  'Parking',
  'Swimming Pool',
  'Gym',
  'Garden',
  'Security',
  'Elevator',
  'Furnished',
  'Pet Friendly',
  'Fireplace',
  'Terrace',
  'Storage',
  'Laundry',
  'Internet',
  'Cable TV',
  'Dishwasher',
  'Microwave',
  'Refrigerator',
  'Washing Machine'
];

// Cities (can be expanded based on service areas)
export const CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Surat',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Pimpri-Chinchwad',
  'Patna',
  'Vadodara'
];

// Price Ranges
export const PRICE_RANGES = [
  { value: '0-1000000', label: 'Under ₹10 Lakh' },
  { value: '1000000-2500000', label: '₹10 Lakh - ₹25 Lakh' },
  { value: '2500000-5000000', label: '₹25 Lakh - ₹50 Lakh' },
  { value: '5000000-10000000', label: '₹50 Lakh - ₹1 Crore' },
  { value: '10000000-25000000', label: '₹1 Crore - ₹2.5 Crore' },
  { value: '25000000-50000000', label: '₹2.5 Crore - ₹5 Crore' },
  { value: '50000000-100000000', label: '₹5 Crore - ₹10 Crore' },
  { value: '100000000-999999999', label: 'Above ₹10 Crore' }
];

// Area Ranges (in sq ft)
export const AREA_RANGES = [
  { value: '0-500', label: 'Under 500 sq ft' },
  { value: '500-1000', label: '500 - 1000 sq ft' },
  { value: '1000-1500', label: '1000 - 1500 sq ft' },
  { value: '1500-2000', label: '1500 - 2000 sq ft' },
  { value: '2000-3000', label: '2000 - 3000 sq ft' },
  { value: '3000-5000', label: '3000 - 5000 sq ft' },
  { value: '5000-10000', label: '5000 - 10000 sq ft' },
  { value: '10000-999999', label: 'Above 10000 sq ft' }
];

// Bedroom Options
export const BEDROOM_OPTIONS = [
  { value: '1', label: '1 BHK' },
  { value: '2', label: '2 BHK' },
  { value: '3', label: '3 BHK' },
  { value: '4', label: '4 BHK' },
  { value: '5', label: '5+ BHK' }
];

// Contact Inquiry Types
export const INQUIRY_TYPES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'property', label: 'Property Inquiry' },
  { value: 'buying', label: 'Buying' },
  { value: 'selling', label: 'Selling' },
  { value: 'renting', label: 'Renting' },
  { value: 'investment', label: 'Investment' },
  { value: 'valuation', label: 'Property Valuation' },
  { value: 'consultation', label: 'Consultation' }
];

// User Roles
export const USER_ROLES = {
  USER: 'user',
  AGENT: 'agent',
  ADMIN: 'admin'
};

// Contact Status
export const CONTACT_STATUS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' }
];

// Contact Priority
export const CONTACT_PRIORITY = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
];

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [6, 12, 24, 48];

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// Map Configuration
export const DEFAULT_MAP_CENTER = [19.0760, 72.8777]; // Mumbai coordinates
export const DEFAULT_MAP_ZOOM = 10;

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500
};

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/patkarsrealty',
  TWITTER: 'https://twitter.com/patkarsrealty',
  INSTAGRAM: 'https://instagram.com/patkarsrealty',
  LINKEDIN: 'https://linkedin.com/company/patkarsrealty',
  YOUTUBE: 'https://youtube.com/patkarsrealty'
};

// Contact Information
export const CONTACT_INFO = {
  PHONE: '+91 98765 43210',
  EMAIL: 'info@patkarsrealty.com',
  ADDRESS: '123 Real Estate Plaza, Mumbai, Maharashtra 400001',
  WORKING_HOURS: 'Mon - Sat: 9:00 AM - 7:00 PM'
};

// SEO Meta Tags
export const SEO_DEFAULTS = {
  TITLE: "Patkar's Realty - Premium Real Estate Services",
  DESCRIPTION: "Find your dream property with Patkar's Realty. We offer premium real estate services including buying, selling, and renting properties across major cities.",
  KEYWORDS: "real estate, property, buy, sell, rent, apartment, house, villa, commercial, residential",
  OG_IMAGE: "/images/og-image.jpg"
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  FILE_TOO_LARGE: 'File size is too large. Maximum allowed size is 5MB.',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a valid file.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PROPERTY_SAVED: 'Property saved successfully!',
  PROPERTY_REMOVED: 'Property removed from saved list.',
  CONTACT_SUBMITTED: 'Your inquiry has been submitted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  EMAIL_VERIFIED: 'Email verified successfully!',
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'Logged out successfully!'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  SEARCH_FILTERS: 'search_filters',
  RECENT_SEARCHES: 'recent_searches',
  THEME_PREFERENCE: 'theme_preference'
};