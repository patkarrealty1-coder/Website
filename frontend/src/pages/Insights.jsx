import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'

const Insights = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:4000/api/blogs')
      const data = await response.json()
      
      if (data.success) {
        setBlogs(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Placeholder blogs if no data from API
  const placeholderBlogs = [
    {
      _id: '1',
      title: 'Best Societies to Live in Charkop 2025',
      excerpt: 'Discover the top residential societies in Charkop with excellent amenities, connectivity, and community living.',
      slug: 'best-societies-charkop-2025',
      createdAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'
    },
    {
      _id: '2',
      title: 'Commercial Property ROI in Kandivali: A Complete Guide',
      excerpt: 'Understanding the return on investment for commercial properties in Kandivali West and East.',
      slug: 'commercial-property-roi-kandivali',
      createdAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    },
    {
      _id: '3',
      title: 'Mumbai Rental Trends 2025: What Landlords Need to Know',
      excerpt: 'Stay updated with the latest rental market trends in Mumbai\'s western suburbs.',
      slug: 'mumbai-rental-trends-2025',
      createdAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    },
    {
      _id: '4',
      title: "First-Time Home Buyer's Guide to Western Mumbai",
      excerpt: 'Everything you need to know before buying your first home in Mumbai\'s western suburbs.',
      slug: 'first-time-buyer-guide-western-mumbai',
      createdAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
    },
    {
      _id: '5',
      title: 'NRI Investment in Mumbai Real Estate: Complete Handbook',
      excerpt: 'A comprehensive guide for Non-Resident Indians looking to invest in Mumbai properties.',
      slug: 'nri-investment-mumbai-handbook',
      createdAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800'
    },
    {
      _id: '6',
      title: 'Stamp Duty Calculator Maharashtra 2025',
      excerpt: 'Calculate stamp duty and registration charges for your property purchase in Maharashtra.',
      slug: 'stamp-duty-calculator-maharashtra-2025',
      createdAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800'
    }
  ]

  const displayBlogs = blogs.length > 0 ? blogs : placeholderBlogs

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Insights</h1>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Real Estate Insights & Market Updates from Mumbai's Western Suburbs
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayBlogs.map((blog) => (
                <article key={blog._id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.featuredImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(blog.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <Link
                      to={`/insights/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Insights
