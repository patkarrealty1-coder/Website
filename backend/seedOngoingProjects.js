const mongoose = require('mongoose')
const Project = require('./models/Project')
require('dotenv').config()

const ongoingProjects = [
  {
    name: 'Phoenix Heights',
    description: 'Modern high-rise residential tower currently under construction, featuring state-of-the-art amenities and panoramic city views.',
    location: {
      address: '234 Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    year: '2025',
    units: '180 Units',
    status: 'Ongoing',
    image: {
      url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
      alt: 'Phoenix Heights - Under construction'
    },
    stats: {
      floors: '35',
      parking: '220 Spots',
      amenities: '25+'
    },
    featured: true,
    isActive: true
  },
  {
    name: 'Emerald Gardens Phase 2',
    description: 'Expansion of our successful Emerald Gardens project, bringing more eco-friendly living spaces with enhanced green features.',
    location: {
      address: '567 Goregaon West',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    year: '2025',
    units: '120 Units',
    status: 'Ongoing',
    image: {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      alt: 'Emerald Gardens Phase 2 - Eco-friendly development'
    },
    stats: {
      floors: '22',
      parking: '150 Spots',
      amenities: '18+'
    },
    featured: true,
    isActive: true
  },
  {
    name: 'Marina Bay Residences',
    description: 'Luxury waterfront apartments with direct marina access, currently in advanced stages of construction.',
    location: {
      address: '890 Bandra Reclamation',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    year: '2025',
    units: '95 Units',
    status: 'Ongoing',
    image: {
      url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      alt: 'Marina Bay Residences - Waterfront luxury'
    },
    stats: {
      floors: '28',
      parking: '120 Spots',
      amenities: '20+'
    },
    featured: true,
    isActive: true
  },
  {
    name: 'Skyline Business Park',
    description: 'Commercial complex with modern office spaces and retail outlets, scheduled for completion in 2025.',
    location: {
      address: '123 BKC',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    year: '2025',
    units: '50 Units',
    status: 'Ongoing',
    image: {
      url: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&q=80',
      alt: 'Skyline Business Park - Commercial development'
    },
    stats: {
      floors: '18',
      parking: '200 Spots',
      amenities: '15+'
    },
    featured: false,
    isActive: true
  }
]

const seedOngoingProjects = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patkars-realty')
    console.log('✅ Connected to MongoDB')

    // Delete existing ongoing projects
    await Project.deleteMany({ status: 'Ongoing' })
    console.log('🗑️  Cleared existing ongoing projects')

    // Insert new ongoing projects
    const createdProjects = await Project.insertMany(ongoingProjects)
    console.log(`✅ Successfully seeded ${createdProjects.length} ongoing projects`)

    // Display created projects
    console.log('\n📋 Created Ongoing Projects:')
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
seedOngoingProjects()
