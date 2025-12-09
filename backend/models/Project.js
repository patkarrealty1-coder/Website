const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  location: {
    address: String,
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    }
  },
  year: {
    type: String,
    required: [true, 'Year is required']
  },
  units: {
    type: String,
    required: [true, 'Units information is required']
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['Completed', 'Ongoing', 'Upcoming', 'On Hold']
  },
  image: {
    url: {
      type: String,
      required: [true, 'Project image is required']
    },
    publicId: String,
    alt: String
  },
  stats: {
    floors: String,
    parking: String,
    amenities: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  gallery: [{
    url: String,
    publicId: String,
    caption: String
  }],
  amenitiesList: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)
