import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchFilter from '../components/SearchFilter'
import PropertyCard from '../components/PropertyCard'

const Listings = () => {
  const [searchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [filters, setFilters] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProperties()
    
    // Handle URL parameters for property type filtering
    const typeParam = searchParams.get('type')
    if (typeParam) {
      const propertyTypeMap = {
        'rental': 'Rental',
        'commercial': 'Commercial', 
        'residential': 'Residential'
      }
      const propertyType = propertyTypeMap[typeParam.toLowerCase()]
      if (propertyType) {
        setFilters({ propertyType })
      }
    }
  }, [searchParams])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('http://localhost:4000/api/properties')
      const data = await response.json()
      
      console.log('Fetched properties:', data)
      
      if (data.success) {
        setProperties(data.data || [])
        setFilteredProperties(data.data || [])
      } else {
        setError('Failed to load properties')
        console.error('API error:', data.message)
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
      setError('Failed to connect to server. Please make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    
    let filtered = properties.filter(property => {
      // Search filter
      if (newFilters.search) {
        const searchTerm = newFilters.search.toLowerCase()
        const matchesSearch = 
          property.title.toLowerCase().includes(searchTerm) ||
          property.location.toLowerCase().includes(searchTerm) ||
          property.description.toLowerCase().includes(searchTerm)
        if (!matchesSearch) return false
      }

      // Property type filter
      if (newFilters.propertyType && property.propertyType !== newFilters.propertyType) {
        return false
      }

      // Location filter
      if (newFilters.location && !property.location.includes(newFilters.location)) {
        return false
      }

      // Bedrooms filter
      if (newFilters.bedrooms) {
        const bedroomCount = newFilters.bedrooms === '5+' ? 5 : parseInt(newFilters.bedrooms)
        if (newFilters.bedrooms === '5+' && property.bedrooms < 5) return false
        if (newFilters.bedrooms !== '5+' && property.bedrooms !== bedroomCount) return false
      }

      // Price filters
      if (newFilters.minPrice && property.price < parseInt(newFilters.minPrice)) {
        return false
      }
      if (newFilters.maxPrice && property.price > parseInt(newFilters.maxPrice)) {
        return false
      }

      return true
    })

    setFilteredProperties(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="h-32 bg-gray-300 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-300 h-96 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Properties</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={fetchProperties}
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
    <div className="min-h-screen bg-gray-50 pt-32 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {filters.propertyType ? `${filters.propertyType} Properties` : 'Property Listings'}
          </h1>
          <p className="text-gray-600">
            Showing {filteredProperties.length} of {properties.length} properties
            {filters.propertyType && (
              <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {filters.propertyType}
              </span>
            )}
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilter onFilterChange={handleFilterChange} filters={filters} />

        {/* Properties Grid/List - Mobile: One per screen with snap scroll, Desktop: Grid */}
        {filteredProperties.length > 0 ? (
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 mt-8">
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
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any properties matching your criteria. Try adjusting your filters.
            </p>
            <button 
              onClick={() => handleFilterChange({})}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Listings
