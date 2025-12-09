const mongoose = require('mongoose')
const Property = require('./models/Property')
require('dotenv').config()

const sampleProperties = [
  // Residential Buy Properties
  {
    title: "Luxury 3BHK Apartment in Bandra West",
    description: "Spacious 3BHK apartment with modern amenities, sea view, and premium location in Bandra West. Perfect for families looking for comfort and convenience.",
    price: 25000000,
    category: "Residential",
    listingType: "Buy",
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    yearBuilt: 2020,
    status: "Available",
    featured: true,
    location: {
      address: "Hill Road, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050"
    },
    listingAgent: {
      name: "Rajesh Sharma",
      email: "rajesh@patkarsrealty.com",
      phone: "+919876543210"
    },
    amenities: ["Parking", "Security", "Gym", "Swimming Pool", "Garden"],
    images: [{
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      caption: "Living Room"
    }],
    approvalStatus: "approved",
    isActive: true
  },
  {
    title: "Modern Villa in Lonavala",
    description: "Beautiful 4BHK villa with private garden, swimming pool, and mountain views. Perfect weekend getaway or permanent residence.",
    price: 45000000,
    category: "Residential",
    listingType: "Buy",
    propertyType: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    yearBuilt: 2019,
    status: "Available",
    featured: true,
    location: {
      address: "Karla Road",
      city: "Lonavala",
      state: "Maharashtra",
      pincode: "410401"
    },
    listingAgent: {
      name: "Priya Patel",
      email: "priya@patkarsrealty.com",
      phone: "+919876543211"
    },
    amenities: ["Swimming Pool", "Garden", "Parking", "Security", "Terrace"],
    images: [{
      url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      caption: "Villa Exterior"
    }],
    approvalStatus: "approved",
    isActive: true
  },
  
  // Residential Rent Properties
  {
    title: "Furnished 2BHK Apartment for Rent",
    description: "Fully furnished 2BHK apartment in prime location. Ready to move in with all modern amenities and appliances included.",
    price: 45000,
    category: "Residential",
    listingType: "Rent",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 900,
    yearBuilt: 2018,
    status: "Available",
    featured: false,
    location: {
      address: "Linking Road, Bandra",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050"
    },
    listingAgent: {
      name: "Amit Kumar",
      email: "amit@patkarsrealty.com",
      phone: "+919876543212"
    },
    amenities: ["Furnished", "Parking", "Security", "Gym", "WiFi"],
    images: [{
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      caption: "Furnished Living Room"
    }],
    approvalStatus: "approved",
    isActive: true
  },
  {
    title: "Spacious 3BHK House for Rent",
    description: "Independent 3BHK house with garden, parking, and peaceful neighborhood. Perfect for families.",
    price: 65000,
    category: "Residential",
    listingType: "Rent",
    propertyType: "House",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    yearBuilt: 2017,
    status: "Available",
    featured: false,
    location: {
      address: "Koregaon Park",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001"
    },
    listingAgent: {
      name: "Sneha Desai",
      email: "sneha@patkarsrealty.com",
      phone: "+919876543213"
    },
    amenities: ["Garden", "Parking", "Security", "Terrace"],
    images: [{
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      caption: "House Exterior"
    }],
    approvalStatus: "approved",
    isActive: true
  },
  
  // Commercial Buy Properties
  {
    title: "Premium Office Space in BKC",
    description: "Grade A office space in Bandra Kurla Complex with modern infrastructure, 24/7 security, and excellent connectivity.",
    price: 85000000,
    category: "Commercial",
    listingType: "Buy",
    propertyType: "Office",
    bedrooms: 0,
    bathrooms: 4,
    sqft: 3000,
    yearBuilt: 2021,
    status: "Available",
    featured: true,
    location: {
      address: "Bandra Kurla Complex",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051"
    },
    listingAgent: {
      name: "Vikram Singh",
      email: "vikram@patkarsrealty.com",
      phone: "+919876543214"
    },
    amenities: ["Air Conditioning", "Elevator", "Security", "Parking"],
    images: [{
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      caption: "Office Building"
    }],
    approvalStatus: "approved",
    isActive: true
  },
  {
    title: "Retail Shop in Prime Location",
    description: "Ground floor retail space in busy commercial area with high footfall. Perfect for retail business or showroom.",
    price: 35000000,
    category: "Commercial",
    listingType: "Buy",
    propertyType: "Shop",
    bedrooms: 0,
    bathrooms: 2,
    sqft: 800,
    yearBuilt: 2019,
    status: "Available",
    featured: false,
    location: {
      address: "Commercial Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001"
    },
    listingAgent: {
      name: "Arjun Reddy",
      email: "arjun@patkarsrealty.com",
      phone: "+919876543215"
    },
    amenities: ["Parking", "Security"],
    images: [{
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      caption: "Retail Space"
    }],
    approvalStatus: "approved",
    isActive: true
  },
  
  // Commercial Rent Properties
  {
    title: "Modern Co-working Space for Rent",
    description: "Fully equipped co-working space with high-speed internet, meeting rooms, and flexible seating arrangements.",
    price: 150000,
    category: "Commercial",
    listingType: "Rent",
    propertyType: "Co-working",
    bedrooms: 0,
    bathrooms: 3,
    sqft: 2000,
    yearBuilt: 2020,
    status: "Available",
    featured: true,
    location: {
      address: "Cyber City",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122002"
    },
    listingAgent: {
      name: "Neha Gupta",
      email: "neha@patkarsrealty.com",
      phone: "+919876543216"
    },
    amenities: ["WiFi", "Parking", "Air Conditioning"],
    images: [{
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      caption: "Co-working Space"
    }],
    approvalStatus: "approved",
    isActive: true
  },
  {
    title: "Warehouse Space for Rent",
    description: "Large warehouse space with loading dock, high ceiling, and excellent connectivity for logistics operations.",
    price: 200000,
    category: "Commercial",
    listingType: "Rent",
    propertyType: "Warehouse",
    bedrooms: 0,
    bathrooms: 2,
    sqft: 10000,
    yearBuilt: 2018,
    status: "Available",
    featured: false,
    location: {
      address: "Industrial Area",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001"
    },
    listingAgent: {
      name: "Ravi Kumar",
      email: "ravi@patkarsrealty.com",
      phone: "+919876543217"
    },
    amenities: ["Security", "Parking"],
    images: [{
      url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      caption: "Warehouse Interior"
    }],
    approvalStatus: "approved",
    isActive: true
  }
]

const seedProperties = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patkars-realty')
    console.log('Connected to MongoDB')

    // Clear existing properties
    await Property.deleteMany({})
    console.log('Cleared existing properties')

    // Insert new properties
    const insertedProperties = await Property.insertMany(sampleProperties)
    console.log(`Inserted ${insertedProperties.length} properties`)

    console.log('\n=== Properties by Category and Type ===')
    const residential = insertedProperties.filter(p => p.category === 'Residential')
    const commercial = insertedProperties.filter(p => p.category === 'Commercial')
    
    console.log(`\nResidential Properties: ${residential.length}`)
    console.log(`- Buy: ${residential.filter(p => p.listingType === 'Buy').length}`)
    console.log(`- Rent: ${residential.filter(p => p.listingType === 'Rent').length}`)
    
    console.log(`\nCommercial Properties: ${commercial.length}`)
    console.log(`- Buy: ${commercial.filter(p => p.listingType === 'Buy').length}`)
    console.log(`- Rent: ${commercial.filter(p => p.listingType === 'Rent').length}`)

    process.exit(0)
  } catch (error) {
    console.error('Error seeding properties:', error)
    process.exit(1)
  }
}

seedProperties()