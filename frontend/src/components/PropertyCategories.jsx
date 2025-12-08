import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const PropertyCategories = () => {
  const categories = [
    {
      id: 'residential',
      title: 'Residential Properties',
      tagline: 'Discover your dream home - buy or rent beautiful residential spaces',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',

      link: '/residential',
      gradient: 'from-green-700 to-green-800'
    },
    {
      id: 'commercial',
      title: 'Commercial Properties',
      tagline: 'Find offices, shops, and investment spaces for your business needs',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',

      link: '/commercial',
      gradient: 'from-green-700 to-green-800'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Property Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're looking to rent, buy, or invest, we have the perfect property for your needs
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
                  
                  {/* Blur overlay on hover */}
                  <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  

                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-5 group-hover:text-gray-800 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                    {category.tagline}
                  </p>
                  
                  {/* Explore Button - Small with Imperial Green */}
                  <Link
                    to={category.link}
                    className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-green-800 text-white rounded-lg md:rounded-xl text-sm md:text-base font-semibold hover:bg-green-900 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 group/button"
                  >
                    Explore {category.title.split(' ')[0]}
                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover/button:translate-x-1" />
                  </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-white/5 to-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for?
          </p>
          <Link
            to="/residential"
            className="inline-flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-green-800 text-white rounded-xl md:rounded-2xl text-sm md:text-base font-semibold hover:bg-green-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Browse All Properties
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PropertyCategories
