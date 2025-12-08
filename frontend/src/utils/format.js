// Currency formatting
export const formatCurrency = (amount, currency = 'INR', locale = 'en-IN') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹0';
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    // Fallback for unsupported locales
    return `₹${formatNumber(amount)}`;
  }
};

// Number formatting with Indian numbering system
export const formatNumber = (number, locale = 'en-IN') => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }

  try {
    return new Intl.NumberFormat(locale).format(number);
  } catch (error) {
    // Fallback formatting
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

// Format price in Indian format (Lakhs and Crores)
export const formatPriceInIndian = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹0';
  }

  const absAmount = Math.abs(amount);
  
  if (absAmount >= 10000000) { // 1 Crore
    const crores = (amount / 10000000).toFixed(2);
    return `₹${crores} Cr`;
  } else if (absAmount >= 100000) { // 1 Lakh
    const lakhs = (amount / 100000).toFixed(2);
    return `₹${lakhs} L`;
  } else if (absAmount >= 1000) { // 1 Thousand
    const thousands = (amount / 1000).toFixed(1);
    return `₹${thousands}K`;
  } else {
    return `₹${formatNumber(amount)}`;
  }
};

// Date formatting
export const formatDate = (date, format = 'short', locale = 'en-IN') => {
  if (!date) return '';

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';

  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    },
  };

  try {
    return new Intl.DateTimeFormat(locale, options[format] || options.short).format(dateObj);
  } catch (error) {
    return dateObj.toLocaleDateString();
  }
};

// Relative time formatting (e.g., "2 hours ago")
export const formatRelativeTime = (date) => {
  if (!date) return '';

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';

  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
};

// Area formatting
export const formatArea = (area, unit = 'sq ft') => {
  if (area === null || area === undefined || isNaN(area)) {
    return `0 ${unit}`;
  }

  return `${formatNumber(area)} ${unit}`;
};

// Phone number formatting
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format Indian mobile numbers
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  } else if (cleaned.length === 13 && cleaned.startsWith('91')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }

  return phone; // Return original if format not recognized
};

// Text truncation
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || text.length <= maxLength) {
    return text || '';
  }

  return text.slice(0, maxLength).trim() + suffix;
};

// Capitalize first letter
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Title case formatting
export const toTitleCase = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Slug generation
export const generateSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// File size formatting
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  if (!bytes || isNaN(bytes)) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Percentage formatting
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }

  return `${value.toFixed(decimals)}%`;
};

// Property type formatting
export const formatPropertyType = (type) => {
  const typeMap = {
    apartment: 'Apartment',
    house: 'House',
    villa: 'Villa',
    studio: 'Studio',
    penthouse: 'Penthouse',
    duplex: 'Duplex',
    commercial: 'Commercial',
    land: 'Land',
  };

  return typeMap[type] || toTitleCase(type);
};

// Property status formatting
export const formatPropertyStatus = (status) => {
  const statusMap = {
    sale: 'For Sale',
    rent: 'For Rent',
    sold: 'Sold',
    rented: 'Rented',
  };

  return statusMap[status] || toTitleCase(status);
};

// Contact status formatting
export const formatContactStatus = (status) => {
  const statusMap = {
    new: 'New',
    contacted: 'Contacted',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
  };

  return statusMap[status] || toTitleCase(status);
};

// Priority formatting
export const formatPriority = (priority) => {
  const priorityMap = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  };

  return priorityMap[priority] || toTitleCase(priority);
};

// URL formatting
export const formatUrl = (url) => {
  if (!url) return '';
  
  // Add protocol if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  
  return url;
};

// Address formatting
export const formatAddress = (address) => {
  if (!address) return '';
  
  const { street, city, state, pincode, country } = address;
  const parts = [street, city, state, pincode, country].filter(Boolean);
  
  return parts.join(', ');
};

// Property features formatting
export const formatFeatures = (features) => {
  if (!features || !Array.isArray(features)) return '';
  
  if (features.length <= 3) {
    return features.join(', ');
  }
  
  return `${features.slice(0, 3).join(', ')} +${features.length - 3} more`;
};

// Search query highlighting
export const highlightSearchTerm = (text, searchTerm) => {
  if (!text || !searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

// Duration formatting
export const formatDuration = (minutes) => {
  if (!minutes || isNaN(minutes)) return '0 min';
  
  if (minutes < 60) {
    return `${minutes} min`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  } else {
    const days = Math.floor(minutes / 1440);
    const remainingHours = Math.floor((minutes % 1440) / 60);
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
  }
};

// Distance formatting
export const formatDistance = (distance, unit = 'km') => {
  if (!distance || isNaN(distance)) return '0 km';
  
  if (unit === 'km' && distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  
  return `${distance.toFixed(1)} ${unit}`;
};