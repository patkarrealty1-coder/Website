import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('http://localhost:4000/api/blogs')
      const data = await response.json()
      
      console.log('Fetched blogs:', data)
      
      if (data.success) {
        setBlogs(data.data || [])
      } else {
        setError('Failed to load blogs')
        console.error('API error:', data.message)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setError('Failed to connect to server. Please make sure the backend is running.')
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-1/3 mx-auto mb-8"></div>
            <div className="h-96 bg-gray-300 rounded-2xl mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-300 h-96 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Blogs</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={fetchBlogs}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Real Estate Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Latest news, tips, and insights from the real estate world
          </p>
        </div>

        {/* Featured Blog */}
        {blogs.length > 0 && (
          <div className="mb-16">
            <Link
              to={`/blog/${blogs[0].slug}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto">
                  <img
                    src={blogs[0].featuredImage || '/images/property-thumbnail.svg'}
                    alt={blogs[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    Featured
                  </span>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block text-sky-500 font-semibold text-sm mb-2">
                    {blogs[0].category}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-sky-500 transition-colors">
                    {blogs[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg">
                    {blogs[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={blogs[0].author.avatar}
                      alt={blogs[0].author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {blogs[0].author.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {blogs[0].author.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(blogs[0].publishedDate)}</span>
                    </div>
                    <span>•</span>
                    <span>{blogs[0].readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(1).map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={blog.featuredImage || '/images/property-thumbnail.svg'}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block text-sky-500 font-semibold text-xs mb-2">
                    {blog.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-500 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-sm text-gray-900">
                        {blog.author.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {blog.author.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(blog.publishedDate)}</span>
                    </div>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-600 mb-6">
              Check back later for new articles and insights.
            </p>
          </div>
        )}

        {/* Load More - Only show if there are more blogs to load */}
        {blogs.length >= 6 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => {
                // Future: implement pagination
                alert('Pagination coming soon!')
              }}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              <span>Load More Articles</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog

