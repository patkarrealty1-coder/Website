import React, { useState, useEffect } from 'react'
import { Building, MapPin, Square, Filter, X } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'

const CommercialProperties = () => {
  const [activeTab, setActiveTab] = useState('Buy')
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    minArea: '',
    maxArea: ''
  })

  const commercialTypes = ['Office', 'Shop', 'Retail', 'Warehouse', 'Co-working']

  useEffect(() => {
    fetchProperties()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [activeTab, properties, filters])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:4000/api/properties')
      const data = await response.json()
      
      if (data.success) {
        // Filter only commercial properties
        const commercialProps = data.data.filter(prop => 
          prop.category === 'Commercial' || 
          commercialTypes.includes(prop.propertyType)
        )
        setProperties(commercialProps)
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = properties.filter(property => {
      // Filter by listing type (Buy/Rent)
      if (property.listingType && property.listingType !== activeTab) {
        return false
      }

      // Location filter
      if (filters.location && !property.location?.city?.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }

      // Price filters
      if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
        return false
      }
      if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
        return false
      }

      // Area filters
      if (filters.minArea && property.sqft < parseInt(filters.minArea)) {
        return false
      }
      if (filters.maxArea && property.sqft > parseInt(filters.maxArea)) {
        return false
      }

      // Property type filter
      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        return false
      }

      return true
    })

    setFilteredProperties(filtered)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      minArea: '',
      maxArea: ''
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="h-16 bg-gray-300 rounded mb-8"></div>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-700 to-green-800 rounded-2xl flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Commercial Properties</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect space for your business - offices, shops, and investment opportunities
          </p>
        </div>

        {/* Buy/Rent Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            {['Buy', 'Rent'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-green-700 to-green-800 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab} Commercial
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {activeTab} Commercial Properties ({filteredProperties.length})
            </h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>

          <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter city..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                <input
                  type="number"
                  placeholder="₹ Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                <input
                  type="number"
                  placeholder="₹ Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {commercialTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Area (sqft)</label>
                <input
                  type="number"
                  placeholder="Min sqft"
                  value={filters.minArea}
                  onChange={(e) => handleFilterChange('minArea', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Area (sqft)</label>
                <input
                  type="number"
                  placeholder="Max sqft"
                  value={filters.maxArea}
                  onChange={(e) => handleFilterChange('maxArea', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid - Mobile: One per screen with snap scroll, Desktop: Grid */}
        {filteredProperties.length > 0 ? (
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {/* Mobile: Horizontal scroll snap */}
            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
              {filteredProperties.map((property) => (
                <div key={property._id} className="flex-shrink-0 w-[calc(100vw-2rem)] snap-center">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
            {/* Desktop: Grid */}
            <div className="hidden md:contents">
              {filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Building className="h-12 w-12 text-green-800" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No {activeTab.toLowerCase()} commercial properties found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any commercial properties matching your criteria. Try adjusting your filters or check back later.
            </p>
            <button 
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommercialProperties
