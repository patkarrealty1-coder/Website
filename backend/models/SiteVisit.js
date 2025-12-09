const mongoose = require('mongoose')

const siteVisitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  visitDate: {
    type: Date,
    required: [true, 'Visit date is required']
  },
  status: {
    type: String,
    enum: ['planned', 'completed', 'cancelled'],
    default: 'planned'
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    maxlength: [500, 'Feedback cannot exceed 500 characters']
  }
}, {
  timestamps: true
})

// Index for efficient queries
siteVisitSchema.index({ user: 1, status: 1 })
siteVisitSchema.index({ user: 1, visitDate: 1 })

module.exports = mongoose.model('SiteVisit', siteVisitSchema)