import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Star, StarOff, Eye, Edit, Trash2, Search, Filter } from 'lucide-react'

const AdminFeaturedProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFeatured, setFilterFeatured] = useState('all') // 'all', 'featured', 'not-featured'

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/properties')
      const data = await response.json()
      
      if (data.success) {
        setProperties(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFeatured = async (propertyId, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:4000/api/properties/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ featured: !currentStatus })
      })

      const data = await response.json()

      if (data.success) {
        // Update local state
        setProperties(properties.map(prop =>
          prop._id === propertyId ? { ...prop, featured: !currentStatus } : prop
        ))
      }
    } catch (error) {
      console.error('Error toggling featured status:', error)
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

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location?.city?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFeatured = filterFeatured === 'all' ||
                           (filterFeatured === 'featured' && property.featured) ||
                           (filterFeatured === 'not-featured' && !property.featured)
    
    return matchesSearch && matchesFeatured
  })

  const featuredCount = properties.filter(p => p.featured).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-300 h-64 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-amber-500" />
            <h1 className="text-4xl font-bold text-gray-900">Featured Luxury Properties</h1>
          </div>
          <p className="text-gray-600">
            Manage which properties appear in the Featured Luxury Properties section on the homepage
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg">
            <Star className="w-5 h-5 text-amber-500" />
            <span className="text-amber-900 font-semibold">
              {featuredCount} {featuredCount === 1 ? 'property' : 'properties'} currently featured
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Filter by Featured Status */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterFeatured}
                onChange={(e) => setFilterFeatured(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">All Properties</option>
                <option value="featured">Featured Only</option>
                <option value="not-featured">Not Featured</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property._id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 transition-all ${
                  property.featured
                    ? 'border-amber-400 shadow-lg shadow-amber-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={property.images?.[0]?.url || property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {property.featured && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    {property.location?.city || property.location}
                  </p>
                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    {formatPrice(property.price)}
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center gap-4 text-sm text-gray-700 mb-4 pb-4 border-b border-gray-200">
                    <span>{property.bedrooms} Beds</span>
                    <span>•</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>•</span>
                    <span>{property.sqft} sqft</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFeatured(property._id, property.featured)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                        property.featured
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-amber-500 text-white hover:bg-amber-600'
                      }`}
                    >
                      {property.featured ? (
                        <>
                          <StarOff className="w-4 h-4" />
                          <span>Unfeature</span>
                        </>
                      ) : (
                        <>
                          <Star className="w-4 h-4" />
                          <span>Feature</span>
                        </>
                      )}
                    </button>

                    <Link
                      to={`/property/${property._id}`}
                      className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      title="View Property"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>

                    <Link
                      to={`/management/properties/edit/${property._id}`}
                      className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      title="Edit Property"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600">
              {searchTerm || filterFeatured !== 'all'
                ? 'Try adjusting your filters'
                : 'Start by adding some properties'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminFeaturedProperties
