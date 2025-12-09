const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  excerpt: {
    type: String,
    required: [true, 'Blog excerpt is required'],
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  featuredImage: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Market Analysis', 
      'Buying Guide', 
      'Selling Tips', 
      'Real Estate Investment', 
      'Home Improvement', 
      'Real Estate News', 
      'Lifestyle & Community', 
      'Local Guides', 
      'Legal & Finance',
      'Other'
    ]
  },
  author: {
    name: {
      type: String,
      required: [true, 'Author name is required']
    },
    role: {
      type: String,
      default: 'Real Estate Expert'
    },
    avatar: {
      type: String,
      default: 'https://ui-avatars.com/api/?name=Author&background=0D8ABC&color=fff'
    }
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  source: {
    type: String,
    enum: ['manual', 'api', 'import'],
    default: 'manual'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  seoTitle: {
    type: String,
    maxlength: [60, 'SEO title cannot exceed 60 characters']
  },
  seoDescription: {
    type: String,
    maxlength: [160, 'SEO description cannot exceed 160 characters']
  },
  views: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
})

// Generate slug from title
blogSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
  
  // Auto-generate SEO fields if not provided
  if (!this.seoTitle) {
    this.seoTitle = this.title.substring(0, 60)
  }
  
  if (!this.seoDescription) {
    this.seoDescription = this.excerpt.substring(0, 160)
  }
  
  // Calculate read time based on content length (average reading speed: 200 words/min)
  if (this.isModified('content') && !this.readTime) {
    const wordCount = this.content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / 200)
    this.readTime = `${minutes} min read`
  }
  
  next()
})

// Method to increment views
blogSchema.methods.incrementViews = function() {
  this.views += 1
  return this.save()
}

// Static method to get featured blogs
blogSchema.statics.getFeatured = function(limit = 3) {
  return this.find({ isFeatured: true, status: 'published' })
    .sort({ publishedDate: -1 })
    .limit(limit)
}

// Static method to get recent blogs
blogSchema.statics.getRecent = function(limit = 6) {
  return this.find({ status: 'published' })
    .sort({ publishedDate: -1 })
    .limit(limit)
}

module.exports = mongoose.model('Blog', blogSchema)
