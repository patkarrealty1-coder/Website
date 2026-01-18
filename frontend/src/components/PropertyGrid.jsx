import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Home, Calendar, Download } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const PropertyGrid = ({ properties, title, showAll = false }) => {
  const displayProperties = showAll ? properties : properties?.slice(0, 4)
  const [headerRef, isHeaderVisible] = useScrollAnimation({ threshold: 0.2, once: true })

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No properties found</div>
        <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-fade-in ${isHeaderVisible ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-5">
            FEATURED LUXURY PROPERTIES
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our handpicked collection of premium residences designed with world-class amenities, unmatched views, and resort-style living.
          </p>
        </div>
        
        {/* Properties Showcase */}
        <div className="space-y-20">
          {displayProperties.map((property, index) => (
            <div 
              key={property._id}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Property Image */}
              <div className="flex-1 relative group">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}
                    alt={property.title}
                    loading="lazy"
                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Image Navigation Dots */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i === 0 ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Property Information */}
              <div className="flex-1 space-y-6">
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    Apartments
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {property.title?.toUpperCase() || 'LUXURY RESIDENCES'}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {property.description || 'Located by the marina, this development blends elegant design with leisure facilities, lush surroundings, and easy access to vibrant retail and dining destinations.'}
                  </p>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Price Range</div>
                      <div className="font-semibold text-gray-900">
                        ${property.price?.toLocaleString() || '1.2M'} - ${((property.price || 1200000) * 1.5).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Home className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Units</div>
                      <div className="font-semibold text-gray-900">1-3BR</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Home className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Size</div>
                      <div className="font-semibold text-gray-900">
                        {property.sqft || '543'} sq. ft. - {((property.sqft || 543) * 2).toLocaleString()} sq. ft.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Year</div>
                      <div className="font-semibold text-gray-900">2027</div>
                    </div>
                  </div>
                </div>

                {/* Action Button - Single Imperial Green Button */}
                <div className="pt-4 flex justify-center lg:justify-start">
                  <Link
                    to={`/property/${property._id}`}
                    className="inline-block bg-green-800 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-lg text-sm md:text-base font-semibold hover:bg-green-900 transition-all shadow-lg hover:shadow-xl"
                  >
                    I AM INTERESTED
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button - Imperial Green */}
        <div className="text-center mt-16">
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-lg text-sm md:text-base hover:bg-green-900 transition-all duration-300 hover:scale-105 font-semibold shadow-lg"
          >
            <span>View All Properties</span>
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PropertyGrid
