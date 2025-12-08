import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const BlogSection = () => {
  const [headerRef, isHeaderVisible] = useScrollAnimation({ threshold: 0.2, once: true })
  const [buttonRef, isButtonVisible] = useScrollAnimation({ threshold: 0.2, once: true })
  const [featuredRef, isFeaturedVisible] = useScrollAnimation({ threshold: 0.2, once: true })
  const [blog1Ref, isBlog1Visible] = useScrollAnimation({ threshold: 0.2, once: true })
  const [blog2Ref, isBlog2Visible] = useScrollAnimation({ threshold: 0.2, once: true })
  const [blog3Ref, isBlog3Visible] = useScrollAnimation({ threshold: 0.2, once: true })

  const featuredBlog = {
    id: 1,
    title: 'High-end properties',
    excerpt: 'Luxury homebuyers and sellers are navigating changing market conditions',
    readTime: '7 min read',
    author: {
      name: 'Dylan Carter',
      role: 'Senior Housing Economist',
      avatar: 'https://ui-avatars.com/api/?name=Dylan+Carter&background=667eea&color=fff'
    },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    date: 'April 15, 2025'
  }

  const blogs = [
    {
      id: 2,
      title: 'Market trends',
      date: 'April 9, 2025',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80'
    },
    {
      id: 3,
      title: 'Housing inventory',
      date: 'March 10, 2025',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80'
    },
    {
      id: 4,
      title: 'The right property',
      date: 'April 10, 2024',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div
            ref={headerRef}
            className={`max-w-2xl scroll-fade-in-left ${isHeaderVisible ? 'visible' : ''}`}
          >
            <h2 className="text-4xl font-bold text-gray-900 leading-tight animate-slide-blur-left">
              Explore our latest blogs for real estate insights
            </h2>
          </div>
          <Link
            ref={buttonRef}
            to="/blog"
            className={`flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-500 hover:scale-105 scroll-fade-in-right ${isButtonVisible ? 'visible' : ''}`}
          >
            <span>View all</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Featured Blog - Large */}
          <Link
            to={`/blog/${featuredBlog.id}`}
            ref={featuredRef}
            className={`group scroll-fade-in scroll-stagger-1 ${isFeaturedVisible ? 'visible' : ''}`}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </Link>

          {/* Featured Blog Content */}
          <div
            ref={featuredRef}
            className={`flex flex-col justify-center scroll-fade-in scroll-stagger-2 ${isFeaturedVisible ? 'visible' : ''}`}
          >
            <div className="bg-gray-50 rounded-2xl p-8 h-full flex flex-col justify-between">
              <div>
                <span className="inline-block bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full mb-4">
                  {featuredBlog.readTime}
                </span>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredBlog.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {featuredBlog.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={featuredBlog.author.avatar}
                  alt={featuredBlog.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {featuredBlog.author.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {featuredBlog.author.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, index) => {
            const ref = index === 0 ? blog1Ref : index === 1 ? blog2Ref : blog3Ref
            const isVisible = index === 0 ? isBlog1Visible : index === 1 ? isBlog2Visible : isBlog3Visible
            
            return (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                ref={ref}
                className={`group scroll-fade-in scroll-stagger-${index + 3} ${isVisible ? 'visible' : ''}`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {blog.date}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BlogSection

