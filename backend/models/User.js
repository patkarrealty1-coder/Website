const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  phone: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: ''
  },
  userType: {
    type: String,
    enum: ['customer', 'agent'],
    default: 'customer'
  },
  preferences: {
    preferredLocations: [{
      type: String,
      trim: true
    }],
    budgetRange: {
      min: {
        type: Number,
        min: 0
      },
      max: {
        type: Number,
        min: 0
      }
    },
    propertyTypes: [{
      type: String,
      enum: ['Apartment', 'Villa', 'House', 'Penthouse', 'Commercial', 'Plot', 'Other']
    }]
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
})

// Hash password before saving (only for local auth)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next()
  
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// Add property to wishlist
userSchema.methods.addToWishlist = async function(propertyId) {
  if (!this.wishlist.includes(propertyId)) {
    this.wishlist.push(propertyId)
    await this.save()
  }
  return this.wishlist
}

// Remove property from wishlist
userSchema.methods.removeFromWishlist = async function(propertyId) {
  this.wishlist = this.wishlist.filter(id => id.toString() !== propertyId.toString())
  await this.save()
  return this.wishlist
}

module.exports = mongoose.model('User', userSchema)
