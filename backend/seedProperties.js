const mongoose = require('mongoose')
const Property = require('./models/Property')
require('dotenv').config()

const properties = [
  {
    title: 'Crestview estate',
    description: 'Beautiful luxury villa with modern amenities and stunning views. Features spacious living areas, premium finishes, and a private pool.',
    price: 27000000,
    location: {
      address: '123 Luxury Lane',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    propertyType: 'Villa',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 2450,
    yearBuilt: 2023,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
        caption: 'Front view'
      }
    ],
    amenities: ['Swimming Pool', 'Parking', 'Garden', 'Security', 'WiFi'],
    status: 'Available',
    featured: true,
    listingAgent: {
      name: 'Rajesh Kumar',
      email: 'rajesh@patkarsrealty.com',
      phone: '+919876543210'
    },
    approvalStatus: 'approved',
    source: 'manual',
    isActive: true
  },
  {
    title: 'Sunset bluff',
    description: 'Contemporary apartment in prime location with excellent connectivity. Modern design with all amenities.',
    price: 2250000,
    location: {
      address: '456 Sunset Avenue',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001'
    },
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1850,
    yearBuilt: 2022,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        caption: 'Exterior view'
      }
    ],
    amenities: ['Parking', 'Elevator', 'Security', 'WiFi', 'Gym'],
    status: 'Available',
    featured: false,
    listingAgent: {
      name: 'Priya Sharma',
      email: 'priya@patkarsrealty.com',
      phone: '+919876543211'
    },
    approvalStatus: 'approved',
    source: 'manual',
    isActive: true
  },
  {
    title: 'Silver birch',
    description: 'Exclusive penthouse with panoramic city and sea views. Luxury living at its finest.',
    price: 1200000,
    location: {
      address: '789 Skyline Tower',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002'
    },
    propertyType: 'Penthouse',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 1450,
    yearBuilt: 2024,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        caption: 'Interior view'
      }
    ],
    amenities: ['Terrace', 'Parking', 'Elevator', 'Security', 'WiFi', 'Air Conditioning'],
    status: 'Available',
    featured: true,
    listingAgent: {
      name: 'Amit Patel',
      email: 'amit@patkarsrealty.com',
      phone: '+919876543212'
    },
    approvalStatus: 'approved',
    source: 'manual',
    isActive: true
  },
  {
    title: 'Nova residence',
    description: 'Charming house near the beach with private garden. Perfect for families.',
    price: 1450000,
    location: {
      address: '321 Beach Road',
      city: 'Goa',
      state: 'Goa',
      pincode: '403001'
    },
    propertyType: 'House',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1550,
    yearBuilt: 2021,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        caption: 'House exterior'
      }
    ],
    amenities: ['Garden', 'Parking', 'Security', 'WiFi'],
    status: 'Available',
    featured: false,
    listingAgent: {
      name: 'Sunita Desai',
      email: 'sunita@patkarsrealty.com',
      phone: '+919876543213'
    },
    approvalStatus: 'approved',
    source: 'manual',
    isActive: true
  },
  {
    title: 'Misty meadows',
    description: 'Spacious apartment perfect for young professionals. Modern amenities and great location.',
    price: 12500000,
    location: {
      address: '654 Green Valley',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001'
    },
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2150,
    yearBuilt: 2023,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
        caption: 'Modern apartment'
      }
    ],
    amenities: ['Parking', 'Elevator', 'Gym', 'Security', 'WiFi', 'Swimming Pool'],
    status: 'Available',
    featured: false,
    listingAgent: {
      name: 'Vikram Singh',
      email: 'vikram@patkarsrealty.com',
      phone: '+919876543214'
    },
    approvalStatus: 'approved',
    source: 'manual',
    isActive: true
  },
  {
    title: 'Rosewood manor',
    description: 'Spacious duplex villa with modern design and premium finishes. Luxury redefined.',
    price: 32000000,
    location: {
      address: '987 Manor Drive',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400003'
    },
    propertyType: 'Villa',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1850,
    yearBuilt: 2024,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
        caption: 'Villa exterior'
      }
    ],
    amenities: ['Swimming Pool', 'Garden', 'Parking', 'Security', 'WiFi', 'Gym'],
    status: 'Available',
    featured: true,
    listingAgent: {
      name: 'Neha Kapoor',
      email: 'neha@patkarsrealty.com',
      phone: '+919876543215'
    },
    approvalStatus: 'approved',
    source: 'manual',
    isActive: true
  }
]

const seedProperties = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patkars-realty', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Connected to MongoDB')

    // Clear existing properties (optional - comment out if you want to keep existing data)
    // await Property.deleteMany({})
    // console.log('Cleared existing properties')

    // Insert properties
    const result = await Property.insertMany(properties)
    console.log(`✅ Successfully inserted ${result.length} properties`)

    // Display inserted properties
    result.forEach((property, index) => {
      console.log(`${index + 1}. ${property.title} - ₹${property.price.toLocaleString('en-IN')}`)
    })

    process.exit(0)
  } catch (error) {
    console.error('Error seeding properties:', error)
    process.exit(1)
  }
}

seedProperties()
