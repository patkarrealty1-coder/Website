const mongoose = require('mongoose')
const Property = require('./models/Property')
require('dotenv').config()

const debugImages = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patkars-realty', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Connected to MongoDB')

    // Get all properties and check their images
    const properties = await Property.find({}).limit(5)
    
    console.log(`Found ${properties.length} properties`)
    
    properties.forEach((property, index) => {
      console.log(`\n${index + 1}. ${property.title}`)
      console.log(`   Images count: ${property.images?.length || 0}`)
      
      if (property.images && property.images.length > 0) {
        property.images.forEach((image, imgIndex) => {
          console.log(`   Image ${imgIndex + 1}:`)
          console.log(`     URL: ${image.url || image}`)
          console.log(`     Caption: ${image.caption || 'No caption'}`)
        })
      } else {
        console.log('   No images found')
      }
    })

    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

debugImages()