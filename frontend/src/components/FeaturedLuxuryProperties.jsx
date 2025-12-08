import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Bed, Bath, Square, MapPin } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const FeaturedLuxuryProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [badgeRef, isBadgeVisible] = useScrollAnimation({ threshold: 0.2, once: true })
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.2, once: true })
  const [gridRef, isGridVisible] = useScrollAnimation({ threshold: 0.2, once: true })

  useEffect(() => {
    fetchFeaturedProperties()
  }, [])

  const fetchFeaturedProperties = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/properties/featured')
      const data = await response.json()
      
      if (data.success) {
        setProperties(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching featured properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`
    }
    return `₹${price.toLocaleString()}`
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-300 h-96 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (properties.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div
            ref={badgeRef}
            className={`scroll-fade-in ${isBadgeVisible ? 'visible' : ''}`}
          >
            <span className="inline-block bg-black text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Featured Properties
            </span>
          </div>
          
          {/* Title */}
          <div
            ref={titleRef}
            className={`scroll-fade-in scroll-stagger-1 ${isTitleVisible ? 'visible' : ''}`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Featured Luxury Properties
            </h2>
            <p className="text-gray-600">
              Discover our handpicked selection of premium properties that redefine luxury living
            </p>
          </div>
        </div>

        {/* Properties Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 scroll-fade-in scroll-stagger-2 ${isGridVisible ? 'visible' : ''}`}
        >
          {properties.map((property) => (
            <Link
              key={property._id}
              to={`/property/${property._id}`}
              className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Featured Badge */}
              <div className="absolute top-4 right-4 z-10 bg-black text-white px-3 py-1 rounded text-xs font-semibold">
                Featured
              </div>

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.images?.[0]?.url || property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {property.location?.city || property.location}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {property.title}
                </h3>

                {/* Price */}
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  {formatPrice(property.price)}
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>

                {/* View Details Link */}
                <div className="flex items-center gap-2 text-gray-900 font-medium group-hover:text-black transition-colors">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            <span>Explore All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedLuxuryProperties
