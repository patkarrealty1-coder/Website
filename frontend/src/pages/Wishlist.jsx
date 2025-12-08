import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Trash2, Home, MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react'

const Wishlist = () => {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      navigate('/login')
      return
    }

    try {
      console.log('Fetching wishlist...')
      const response = await fetch('http://localhost:4000/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Wishlist data:', data)

      if (data.success) {
        console.log('Setting wishlist with', data.data.length, 'items')
        setWishlist(data.data || [])
      } else {
        console.error('API returned error:', data.message)
        setError(data.message)
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error)
      setError('Failed to load wishlist')
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (propertyId) => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`http://localhost:4000/api/wishlist/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        setWishlist(wishlist.filter(item => item._id !== propertyId))
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Start adding properties you love to keep track of them
            </p>
            <Link
              to="/listings"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-900 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Browse Properties</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.filter(property => property && property._id).map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                {/* Property Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.images?.[0]?.url || property.images?.[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'}
                    alt={property.title || 'Property'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(property._id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-red-50 transition-colors group/btn"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="h-5 w-5 text-gray-600 group-hover/btn:text-red-600" />
                  </button>

                  {/* Property Type Badge */}
                  {property.type && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-green-800 text-white text-sm font-semibold rounded-full">
                      {property.type}
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-6">
                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-blue-600">
                      ${property.price?.toLocaleString() || '0'}
                    </span>
                    {property.priceType && (
                      <span className="text-gray-500 text-sm ml-2">/{property.priceType}</span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {property.title || 'Untitled Property'}
                  </h3>

                  {/* Location */}
                  {(property.location || property.location?.city) && (
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {typeof property.location === 'string' 
                          ? property.location 
                          : property.location?.city || 'Location not specified'}
                      </span>
                    </div>
                  )}

                  {/* Features */}
                  <div className="flex items-center space-x-4 text-gray-600 mb-4 pb-4 border-b">
                    {property.bedrooms && (
                      <div className="flex items-center space-x-1">
                        <Bed className="h-4 w-4" />
                        <span className="text-sm">{property.bedrooms}</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center space-x-1">
                        <Bath className="h-4 w-4" />
                        <span className="text-sm">{property.bathrooms}</span>
                      </div>
                    )}
                    {property.sqft && (
                      <div className="flex items-center space-x-1">
                        <Square className="h-4 w-4" />
                        <span className="text-sm">{property.sqft} sqft</span>
                      </div>
                    )}
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/property/${property._id}`}
                    className="block w-full text-center px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Browsing */}
        {wishlist.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              to="/listings"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
            >
              <span>Continue Browsing</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist

