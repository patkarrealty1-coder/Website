const mongoose = require('mongoose');

const faqItemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 }
});

const pageContentSchema = new mongoose.Schema({
  pageType: {
    type: String,
    required: true,
    unique: true,
    enum: ['faq', 'contact', 'about', 'privacy-policy', 'terms-conditions']
  },
  title: { type: String, required: true },
  content: { type: String }, // For simple text content
  sections: [{ // For structured content
    heading: String,
    content: String,
    order: { type: Number, default: 0 }
  }],
  faqs: [faqItemSchema], // Specifically for FAQ page
  contactInfo: { // Specifically for Contact page
    phone: String,
    email: String,
    address: String,
    officeHours: String
  },
  lastUpdated: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

module.exports = mongoose.model('PageContent', pageContentSchema);
