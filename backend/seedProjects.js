const mongoose = require('mongoose')
const Project = require('./models/Project')
require('dotenv').config()

const projects = [
  {
    name: 'Skyline Residences',
    description: 'A luxurious 25-story residential tower featuring premium apartments with stunning city views, modern amenities, and world-class facilities.',
    location: {
      address: '123 Marine Drive',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    year: '2023',
    units: '120 Units',
    status: 'Completed',
    image: {
      url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      alt: 'Skyline Residences - Modern residential tower'
    },
    stats: {
      floors: '25',
      parking: '150 Spots',
      amenities: '15+'
    },
    featured: true,
    isActive: true
  },
  {
    name: 'Green Valley Apartments',
    description: 'Eco-friendly residential complex with lush green spaces, sustainable design, and modern living facilities in the heart of the city.',
    location: {
      address: '456 Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    year: '2022',
    units: '80 Units',
    status: 'Completed',
    image: {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      alt: 'Green Valley Apartments - Eco-friendly living'
    },
    stats: {
      floors: '18',
      parking: '100 Spots',
      amenities: '12+'
    },
    featured: true,
    isActive: true
  },
  {
    name: 'Ocean View Towers',
    description: 'Premium beachfront residential towers offering breathtaking ocean views, luxury amenities, and direct beach access.',
    location: {
      address: '789 Juhu Beach Road',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    year: '2023',
    units: '150 Units',
    status: 'Completed',
    image: {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      alt: 'Ocean View Towers - Beachfront luxury'
    },
    stats: {
      floors: '30',
      parking: '200 Spots',
      amenities: '20+'
    },
    featured: true,
    isActive: true
  },
  {
    name: 'Heritage Plaza',
    description: 'A beautifully restored heritage building converted into modern luxury apartments while preserving its historical charm.',
    location: {
      address: '321 Fort Area',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    year: '2021',
    units: '45 Units',
    status: 'Completed',
    image: {
      url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
      alt: 'Heritage Plaza - Historic luxury'
    },
    stats: {
      floors: '12',
      parking: '60 Spots',
      amenities: '10+'
    },
    featured: false,
    isActive: true
  },
  {
    name: 'Tech Park Residences',
    description: 'Smart homes with integrated technology, located near major IT hubs, perfect for modern professionals.',
    location: {
      address: '555 Powai',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    year: '2023',
    units: '200 Units',
    status: 'Completed',
    image: {
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      alt: 'Tech Park Residences - Smart living'
    },
    stats: {
      floors: '28',
      parking: '250 Spots',
      amenities: '18+'
    },
    featured: true,
    isActive: true
  },
  {
    name: 'Royal Gardens',
    description: 'Spacious garden apartments with large balconies, landscaped gardens, and family-friendly amenities.',
    location: {
      address: '888 Andheri East',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    year: '2022',
    units: '95 Units',
    status: 'Completed',
    image: {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      alt: 'Royal Gardens - Family living'
    },
    stats: {
      floors: '15',
      parking: '120 Spots',
      amenities: '14+'
    },
    featured: false,
    isActive: true
  }
]

const seedProjects = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patkars-realty')
    console.log('✅ Connected to MongoDB')

    // Clear existing projects
    await Project.deleteMany({})
    console.log('🗑️  Cleared existing projects')

    // Insert new projects
    const createdProjects = await Project.insertMany(projects)
    console.log(`✅ Successfully seeded ${createdProjects.length} projects`)

    // Display created projects
    console.log('\n📋 Created Projects:')
    createdProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name} - ${project.location.city} (${project.year})`)
    })

    console.log('\n🎉 Database seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

// Run the seed function
seedProjects()
