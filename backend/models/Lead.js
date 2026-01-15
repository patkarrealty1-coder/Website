const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
  // Contact Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  
  // Property Requirements
  propertyType: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['1bhk', '2bhk', '3bhk', '4bhk', 'commercial', 'plot']
  },
  budgetRange: {
    type: String,
    required: [true, 'Budget range is required'],
    enum: ['30-50', '50-75', '75-1cr', '1-1.5cr', '1.5-2cr', '2cr+']
  },
  preferredLocality: {
    type: String,
    required: [true, 'Preferred locality is required'],
    enum: ['charkop', 'kandivali', 'borivali-west', 'borivali-east', 'malad', 'goregaon', 'andheri', 'dahisar']
  },
  
  // Lead Management
  source: {
    type: String,
    enum: ['website-form', 'phone', 'walk-in', 'referral', 'social-media', 'other'],
    default: 'website-form'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'site-visit-scheduled', 'negotiation', 'converted', 'closed', 'lost'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Assignment & Follow-up
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  followUpDate: {
    type: Date
  },
  lastContactedAt: {
    type: Date
  },
  
  // Notes & History
  notes: [{
    message: {
      type: String,
      required: true
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Conversion Tracking
  convertedProperty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
  convertedAt: {
    type: Date
  },
  dealValue: {
    type: Number,
    min: 0
  },
  
  // Metadata
  ipAddress: String,
  userAgent: String,
  utmSource: String,
  utmMedium: String,
  utmCampaign: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes for efficient querying
leadSchema.index({ email: 1 })
leadSchema.index({ phone: 1 })
leadSchema.index({ status: 1, createdAt: -1 })
leadSchema.index({ assignedTo: 1, status: 1 })
leadSchema.index({ priority: 1, status: 1 })
leadSchema.index({ followUpDate: 1 })
leadSchema.index({ preferredLocality: 1 })
leadSchema.index({ budgetRange: 1 })

// Virtual for days since lead created
leadSchema.virtual('daysSinceCreated').get(function() {
  const now = new Date()
  const diffTime = Math.abs(now - this.createdAt)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

// Virtual for formatted budget
leadSchema.virtual('formattedBudget').get(function() {
  const budgetMap = {
    '30-50': '₹30-50 Lakhs',
    '50-75': '₹50-75 Lakhs',
    '75-1cr': '₹75 Lakhs - 1 Crore',
    '1-1.5cr': '₹1-1.5 Crore',
    '1.5-2cr': '₹1.5-2 Crore',
    '2cr+': '₹2 Crore+'
  }
  return budgetMap[this.budgetRange] || this.budgetRange
})

// Virtual for formatted property type
leadSchema.virtual('formattedPropertyType').get(function() {
  const typeMap = {
    '1bhk': '1 BHK',
    '2bhk': '2 BHK',
    '3bhk': '3 BHK',
    '4bhk': '4+ BHK',
    'commercial': 'Commercial',
    'plot': 'Plot/Land'
  }
  return typeMap[this.propertyType] || this.propertyType
})

// Method to add note
leadSchema.methods.addNote = function(message, addedBy) {
  this.notes.push({
    message,
    addedBy,
    addedAt: new Date()
  })
  return this.save()
}

// Method to update status
leadSchema.methods.updateStatus = function(newStatus, userId) {
  this.status = newStatus
  if (newStatus === 'contacted' || newStatus === 'in-progress') {
    this.lastContactedAt = new Date()
  }
  if (newStatus === 'converted') {
    this.convertedAt = new Date()
  }
  return this.save()
}

// Static method to get lead stats
leadSchema.statics.getLeadStats = async function() {
  const total = await this.countDocuments()
  const newLeads = await this.countDocuments({ status: 'new' })
  const contacted = await this.countDocuments({ status: 'contacted' })
  const inProgress = await this.countDocuments({ status: 'in-progress' })
  const converted = await this.countDocuments({ status: 'converted' })
  const closed = await this.countDocuments({ status: 'closed' })
  
  const thisMonth = await this.countDocuments({
    createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
  })
  
  const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : 0
  
  return {
    total,
    new: newLeads,
    contacted,
    inProgress,
    converted,
    closed,
    thisMonth,
    conversionRate: `${conversionRate}%`
  }
}

// Static method to get leads by locality
leadSchema.statics.getLeadsByLocality = async function() {
  return this.aggregate([
    { $group: { _id: '$preferredLocality', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ])
}

// Static method to get leads by budget
leadSchema.statics.getLeadsByBudget = async function() {
  return this.aggregate([
    { $group: { _id: '$budgetRange', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ])
}

module.exports = mongoose.model('Lead', leadSchema)
