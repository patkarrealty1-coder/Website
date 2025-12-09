const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Property description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Property price is required'],
    min: [0, 'Price cannot be negative']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  propertyType: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['Apartment', 'Villa', 'House', 'Penthouse', 'Plot', 'Office', 'Shop', 'Retail', 'Warehouse', 'Co-working', 'Other']
  },
  category: {
    type: String,
    required: [true, 'Property category is required'],
    enum: ['Residential', 'Commercial']
  },
  listingType: {
    type: String,
    required: [true, 'Listing type is required'],
    enum: ['Buy', 'Rent']
  },
  bedrooms: {
    type: Number,
    required: [true, 'Number of bedrooms is required'],
    min: [0, 'Bedrooms cannot be negative']
  },
  bathrooms: {
    type: Number,
    required: [true, 'Number of bathrooms is required'],
    min: [0, 'Bathrooms cannot be negative']
  },
  sqft: {
    type: Number,
    required: [true, 'Square footage is required'],
    min: [1, 'Square footage must be at least 1']
  },
  yearBuilt: {
    type: Number,
    min: [1800, 'Year built cannot be before 1800'],
    max: [new Date().getFullYear() + 5, 'Year built cannot be more than 5 years in the future']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String, // For Cloudinary
    caption: String
  }],
  amenities: [{
    type: String,
    enum: [
      'Parking', 'WiFi', 'Gym', 'Security', 'Garden', 'Swimming Pool',
      'Elevator', 'Balcony', 'Air Conditioning', 'Heating', 'Furnished',
      'Pet Friendly', 'Laundry', 'Storage', 'Fireplace', 'Terrace',
      'Power Backup', 'Water Supply', 'Maintenance Staff', 'CCTV',
      'Intercom', 'Clubhouse', 'Playground', 'Jogging Track'
    ]
  }],
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Under Contract', 'Off Market'],
    default: 'Available'
  },
  approvalStatus: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'approved'
  },
  source: {
    type: String,
    enum: ['manual', 'api', 'import'],
    default: 'manual'
  },
  featured: {
    type: Boolean,
    default: false
  },
  listingAgent: {
    name: {
      type: String,
      required: [true, 'Agent name is required']
    },
    email: {
      type: String,
      required: [true, 'Agent email is required'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Agent phone is required'],
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    }
  },
  views: {
    type: Number,
    default: 0
  },
  favorites: {
    type: Number,
    default: 0
  },
  virtualTour: {
    url: String,
    type: {
      type: String,
      enum: ['360', 'video', 'gallery']
    }
  },
  documents: [{
    name: String,
    url: String,
    type: {
      type: String,
      enum: ['floor_plan', 'legal_document', 'certificate', 'other']
    }
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual for full location
propertySchema.virtual('fullLocation').get(function() {
  return `${this.location.address}, ${this.location.city}, ${this.location.state} ${this.location.pincode}`
})

// Virtual for price per sqft
propertySchema.virtual('pricePerSqft').get(function() {
  return Math.round(this.price / this.sqft)
})

// Index for search functionality
propertySchema.index({
  title: 'text',
  description: 'text',
  'location.address': 'text',
  'location.city': 'text'
})

// Index for location-based queries
propertySchema.index({ 'location.coordinates': '2dsphere' })

// Index for filtering
propertySchema.index({ propertyType: 1, price: 1, bedrooms: 1, bathrooms: 1 })
propertySchema.index({ featured: 1, isActive: 1 })
propertySchema.index({ status: 1, isActive: 1 })

// Middleware to increment views
propertySchema.methods.incrementViews = function() {
  this.views += 1
  return this.save()
}

// Static method to get featured properties
propertySchema.statics.getFeatured = function(limit = 6) {
  return this.find({ featured: true, isActive: true, status: 'Available' })
    .sort({ createdAt: -1 })
    .limit(limit)
}

// Static method for search with filters
propertySchema.statics.searchProperties = function(filters = {}) {
  const query = { isActive: true }
  
  // Text search
  if (filters.search) {
    query.$text = { $search: filters.search }
  }
  
  // Property type filter
  if (filters.propertyType && filters.propertyType !== 'All') {
    query.propertyType = filters.propertyType
  }
  
  // Location filter
  if (filters.location) {
    query.$or = [
      { 'location.city': new RegExp(filters.location, 'i') },
      { 'location.address': new RegExp(filters.location, 'i') }
    ]
  }
  
  // Bedrooms filter
  if (filters.bedrooms) {
    if (filters.bedrooms === '4+') {
      query.bedrooms = { $gte: 4 }
    } else {
      query.bedrooms = parseInt(filters.bedrooms)
    }
  }
  
  // Price range filter
  if (filters.minPrice || filters.maxPrice) {
    query.price = {}
    if (filters.minPrice) query.price.$gte = parseInt(filters.minPrice)
    if (filters.maxPrice) query.price.$lte = parseInt(filters.maxPrice)
  }
  
  // Status filter
  if (filters.status) {
    query.status = filters.status
  } else {
    query.status = 'Available' // Default to available properties
  }
  
  return this.find(query)
}

module.exports = mongoose.model('Property', propertySchema)