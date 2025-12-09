const mongoose = require('mongoose')
const Blog = require('./models/Blog')
require('dotenv').config()

const blogs = [
  {
    title: 'High-end properties',
    excerpt: 'Discover the most luxurious properties in prime locations with exceptional amenities and stunning architecture.',
    content: `
      <h2>The World of Luxury Real Estate</h2>
      <p>High-end properties represent the pinnacle of luxury living, offering unparalleled comfort, exclusivity, and prestige. These exceptional homes are characterized by their prime locations, superior construction quality, and world-class amenities.</p>
      
      <h3>Key Features of High-End Properties</h3>
      <p>Luxury properties typically feature spacious layouts, premium materials, smart home technology, and breathtaking views. From penthouse apartments in bustling cities to sprawling estates in serene countryside settings, these properties cater to the most discerning buyers.</p>
      
      <h3>Investment Potential</h3>
      <p>Beyond their aesthetic appeal, high-end properties often represent sound investment opportunities. They tend to hold their value well and can appreciate significantly over time, especially in sought-after locations.</p>
      
      <h3>The Buying Process</h3>
      <p>Purchasing a luxury property requires careful consideration and expert guidance. Working with experienced real estate professionals who specialize in high-end markets is essential to navigate the complexities of these transactions.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    category: 'Market Analysis',
    author: {
      name: 'Sarah Johnson',
      role: 'Luxury Real Estate Specialist',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff'
    },
    publishedDate: new Date('2024-04-09'),
    readTime: '5 min read',
    status: 'published',
    isFeatured: true,
    tags: ['luxury', 'high-end', 'investment'],
    seoTitle: 'High-End Properties: Guide to Luxury Real Estate',
    seoDescription: 'Explore the world of high-end properties and luxury real estate investments in prime locations.'
  },
  {
    title: 'Market trends',
    excerpt: 'Stay informed about the latest real estate market trends, price movements, and emerging opportunities in the property sector.',
    content: `
      <h2>Understanding Current Market Trends</h2>
      <p>The real estate market is constantly evolving, influenced by economic factors, demographic shifts, and changing buyer preferences. Staying informed about these trends is crucial for making smart property decisions.</p>
      
      <h3>Price Dynamics</h3>
      <p>Property prices have shown resilience in recent months, with certain segments experiencing significant growth. Urban areas continue to attract buyers, while suburban properties are gaining popularity among families seeking more space.</p>
      
      <h3>Emerging Opportunities</h3>
      <p>New developments in infrastructure and technology are creating exciting opportunities in previously overlooked areas. Smart investors are identifying these emerging markets early to maximize their returns.</p>
      
      <h3>Future Outlook</h3>
      <p>Experts predict continued growth in the real estate sector, driven by urbanization, rising incomes, and favorable government policies. However, buyers should remain cautious and conduct thorough due diligence.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    category: 'Market Analysis',
    author: {
      name: 'Michael Chen',
      role: 'Market Analyst',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=10B981&color=fff'
    },
    publishedDate: new Date('2024-04-10'),
    readTime: '6 min read',
    status: 'published',
    isFeatured: true,
    tags: ['market', 'trends', 'analysis'],
    seoTitle: 'Real Estate Market Trends 2024: What You Need to Know',
    seoDescription: 'Latest real estate market trends, price movements, and investment opportunities in the property sector.'
  },
  {
    title: 'Housing inventory',
    excerpt: 'Comprehensive analysis of current housing inventory levels and what they mean for buyers and sellers in today\'s market.',
    content: `
      <h2>The State of Housing Inventory</h2>
      <p>Housing inventory levels play a crucial role in determining market dynamics, affecting both prices and buyer competition. Understanding current inventory trends helps both buyers and sellers make informed decisions.</p>
      
      <h3>Current Inventory Levels</h3>
      <p>The market is experiencing varied inventory levels across different segments. While some areas face shortages, others are seeing increased listings, creating diverse opportunities for buyers.</p>
      
      <h3>Impact on Buyers</h3>
      <p>Low inventory typically means more competition and higher prices, while abundant inventory gives buyers more negotiating power. Understanding these dynamics is essential for timing your purchase correctly.</p>
      
      <h3>Seller Considerations</h3>
      <p>For sellers, inventory levels directly impact how quickly properties sell and at what price. In low-inventory markets, sellers often receive multiple offers, while high-inventory markets may require more strategic pricing.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80',
    category: 'Market Analysis',
    author: {
      name: 'Emily Rodriguez',
      role: 'Real Estate Consultant',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=F59E0B&color=fff'
    },
    publishedDate: new Date('2024-03-10'),
    readTime: '4 min read',
    status: 'published',
    isFeatured: false,
    tags: ['inventory', 'market', 'supply'],
    seoTitle: 'Housing Inventory Analysis: Market Insights',
    seoDescription: 'Understanding housing inventory levels and their impact on real estate market dynamics.'
  },
  {
    title: 'The right property',
    excerpt: 'Essential tips and strategies for finding the perfect property that matches your lifestyle, budget, and long-term goals.',
    content: `
      <h2>Finding Your Perfect Property</h2>
      <p>Choosing the right property is one of the most important decisions you'll make. It requires careful consideration of multiple factors including location, budget, amenities, and future potential.</p>
      
      <h3>Define Your Requirements</h3>
      <p>Start by clearly defining what you need versus what you want. Consider factors like proximity to work, schools, healthcare facilities, and lifestyle amenities. Create a prioritized list to guide your search.</p>
      
      <h3>Location Matters</h3>
      <p>The old adage "location, location, location" remains true. A property in a prime location not only enhances your quality of life but also tends to appreciate better over time.</p>
      
      <h3>Future-Proofing Your Choice</h3>
      <p>Think about your future needs. Will the property accommodate a growing family? Is it in an area with development potential? These considerations ensure your investment remains valuable long-term.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    category: 'Buying Guide',
    author: {
      name: 'David Kumar',
      role: 'Property Advisor',
      avatar: 'https://ui-avatars.com/api/?name=David+Kumar&background=8B5CF6&color=fff'
    },
    publishedDate: new Date('2024-04-15'),
    readTime: '7 min read',
    status: 'published',
    isFeatured: true,
    tags: ['buying', 'guide', 'tips'],
    seoTitle: 'How to Find The Right Property: Complete Guide',
    seoDescription: 'Expert tips for finding the perfect property that matches your needs and budget.'
  },
  {
    title: 'Investment strategies',
    excerpt: 'Proven real estate investment strategies to maximize returns and build long-term wealth through property investments.',
    content: `
      <h2>Smart Real Estate Investment Strategies</h2>
      <p>Real estate investment offers numerous opportunities for wealth creation. Understanding different strategies and choosing the right approach for your goals is key to success.</p>
      
      <h3>Buy and Hold Strategy</h3>
      <p>This classic strategy involves purchasing properties and holding them long-term for appreciation and rental income. It's ideal for investors seeking steady cash flow and long-term wealth building.</p>
      
      <h3>Value Addition</h3>
      <p>Buying undervalued properties, renovating them, and selling or renting at higher prices can generate significant returns. This strategy requires market knowledge and renovation expertise.</p>
      
      <h3>Diversification</h3>
      <p>Spreading investments across different property types and locations reduces risk and maximizes potential returns. Consider residential, commercial, and mixed-use properties.</p>
      
      <h3>Market Timing</h3>
      <p>While timing the market perfectly is impossible, understanding market cycles helps make better investment decisions. Buy during market corrections and hold through growth phases.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    category: 'Investment',
    author: {
      name: 'Robert Williams',
      role: 'Investment Strategist',
      avatar: 'https://ui-avatars.com/api/?name=Robert+Williams&background=EF4444&color=fff'
    },
    publishedDate: new Date('2024-04-12'),
    readTime: '8 min read',
    status: 'published',
    isFeatured: false,
    tags: ['investment', 'strategy', 'wealth'],
    seoTitle: 'Real Estate Investment Strategies for Maximum Returns',
    seoDescription: 'Learn proven investment strategies to build wealth through real estate.'
  },
  {
    title: 'Home staging tips',
    excerpt: 'Professional home staging tips to make your property more appealing to buyers and sell faster at better prices.',
    content: `
      <h2>The Art of Home Staging</h2>
      <p>Home staging is a powerful tool that can significantly impact how quickly your property sells and at what price. Professional staging helps buyers envision themselves living in the space.</p>
      
      <h3>Declutter and Depersonalize</h3>
      <p>Remove personal items, excess furniture, and clutter. Create a clean, neutral space that allows buyers to imagine their own belongings in the home.</p>
      
      <h3>Enhance Curb Appeal</h3>
      <p>First impressions matter. Ensure the exterior is well-maintained with fresh paint, manicured landscaping, and an inviting entrance. This sets a positive tone for the entire viewing.</p>
      
      <h3>Highlight Key Features</h3>
      <p>Arrange furniture to showcase the property's best features. Create focal points in each room and ensure good flow between spaces. Use lighting strategically to create warmth and ambiance.</p>
      
      <h3>Professional Photography</h3>
      <p>Once staged, invest in professional photography. High-quality images are crucial for online listings and can dramatically increase buyer interest.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
    category: 'Selling Tips',
    author: {
      name: 'Jennifer Martinez',
      role: 'Staging Consultant',
      avatar: 'https://ui-avatars.com/api/?name=Jennifer+Martinez&background=EC4899&color=fff'
    },
    publishedDate: new Date('2024-04-08'),
    readTime: '5 min read',
    status: 'published',
    isFeatured: false,
    tags: ['staging', 'selling', 'tips'],
    seoTitle: 'Home Staging Tips: Sell Your Property Faster',
    seoDescription: 'Professional home staging tips to make your property more appealing to buyers.'
  }
]

const seedBlogs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patkars-realty', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Connected to MongoDB')

    // Clear existing blogs
    await Blog.deleteMany({})
    console.log('Cleared existing blogs')

    // Insert blogs one by one to trigger pre-save hooks
    const result = []
    for (const blogData of blogs) {
      const blog = await Blog.create(blogData)
      result.push(blog)
    }
    
    console.log(`✅ Successfully created ${result.length} blogs`)

    // Display inserted blogs
    result.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title} (${blog.slug})`)
      console.log(`   Category: ${blog.category} | Author: ${blog.author.name}`)
      console.log(`   Featured: ${blog.isFeatured ? 'Yes' : 'No'} | Status: ${blog.status}`)
      console.log(`   Read Time: ${blog.readTime}`)
      console.log('')
    })

    process.exit(0)
  } catch (error) {
    console.error('Error seeding blogs:', error)
    process.exit(1)
  }
}

seedBlogs()
