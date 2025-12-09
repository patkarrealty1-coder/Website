const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
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
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  propertyType: {
    type: String,
    enum: ['Apartment', 'Villa', 'House', 'Penthouse', 'Commercial', 'Plot', 'Other', '']
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
  inquiryType: {
    type: String,
    enum: ['general', 'property_inquiry', 'viewing_request', 'selling_inquiry', 'investment_advice'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'resolved', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  response: {
    message: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  },
  notes: [{
    message: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  source: {
    type: String,
    enum: ['website', 'phone', 'email', 'walk_in', 'referral', 'social_media'],
    default: 'website'
  },
  ipAddress: String,
  userAgent: String,
  isRead: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  tags: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes for efficient querying
contactSchema.index({ email: 1 })
contactSchema.index({ status: 1, createdAt: -1 })
contactSchema.index({ assignedTo: 1, status: 1 })
contactSchema.index({ propertyId: 1 })
contactSchema.index({ inquiryType: 1 })
contactSchema.index({ isRead: 1, createdAt: -1 })

// Virtual for days since inquiry
contactSchema.virtual('daysSinceInquiry').get(function() {
  const now = new Date()
  const diffTime = Math.abs(now - this.createdAt)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

// Virtual for response time (if responded)
contactSchema.virtual('responseTime').get(function() {
  if (!this.response || !this.response.respondedAt) return null
  
  const diffTime = Math.abs(this.response.respondedAt - this.createdAt)
  const hours = Math.floor(diffTime / (1000 * 60 * 60))
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
})

// Method to mark as read
contactSchema.methods.markAsRead = function() {
  this.isRead = true
  return this.save()
}

// Method to assign to user
contactSchema.methods.assignTo = function(userId) {
  this.assignedTo = userId
  this.status = 'in_progress'
  return this.save()
}

// Method to add response
contactSchema.methods.addResponse = function(message, respondedBy) {
  this.response = {
    message,
    respondedBy,
    respondedAt: new Date()
  }
  this.status = 'resolved'
  this.isRead = true
  return this.save()
}

// Method to add note
contactSchema.methods.addNote = function(message, addedBy) {
  this.notes.push({
    message,
    addedBy,
    addedAt: new Date()
  })
  return this.save()
}

// Static method to get contact stats
contactSchema.statics.getContactStats = async function() {
  const totalContacts = await this.countDocuments()
  const newContacts = await this.countDocuments({ status: 'new' })
  const inProgressContacts = await this.countDocuments({ status: 'in_progress' })
  const resolvedContacts = await this.countDocuments({ status: 'resolved' })
  
  const contactsThisMonth = await this.countDocuments({
    createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
  })
  
  const avgResponseTime = await this.aggregate([
    {
      $match: {
        'response.respondedAt': { $exists: true }
      }
    },
    {
      $project: {
        responseTime: {
          $subtract: ['$response.respondedAt', '$createdAt']
        }
      }
    },
    {
      $group: {
        _id: null,
        avgResponseTime: { $avg: '$responseTime' }
      }
    }
  ])
  
  return {
    total: totalContacts,
    new: newContacts,
    inProgress: inProgressContacts,
    resolved: resolvedContacts,
    thisMonth: contactsThisMonth,
    avgResponseTimeHours: avgResponseTime.length > 0 
      ? Math.round(avgResponseTime[0].avgResponseTime / (1000 * 60 * 60)) 
      : 0
  }
}

// Static method to get recent contacts
contactSchema.statics.getRecentContacts = function(limit = 10) {
  return this.find()
    .populate('propertyId', 'title location.city')
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 })
    .limit(limit)
}

// Static method for contact analytics
contactSchema.statics.getContactAnalytics = async function() {
  const inquiryTypeStats = await this.aggregate([
    {
      $group: {
        _id: '$inquiryType',
        count: { $sum: 1 }
      }
    }
  ])
  
  const sourceStats = await this.aggregate([
    {
      $group: {
        _id: '$source',
        count: { $sum: 1 }
      }
    }
  ])
  
  const monthlyStats = await this.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': -1, '_id.month': -1 }
    },
    {
      $limit: 12
    }
  ])
  
  return {
    byInquiryType: inquiryTypeStats,
    bySource: sourceStats,
    monthly: monthlyStats
  }
}

module.exports = mongoose.model('Contact', contactSchema)