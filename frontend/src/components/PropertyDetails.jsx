import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bed, Bath, Square, ChevronRight } from 'lucide-react'

const PropertyDetails = ({ property }) => {
  const navigate = useNavigate()
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    )
  }

  const {
    title,
    price,
    description,
    bedrooms,
    bathrooms,
    sqft,
    images = [],
    yearBuilt,
    listingSpace,
    completionYear,
    floors,
    bedRooms
  } = property

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(3)}`
    }
    return `$${price.toLocaleString()}`
  }

  const detailsData = [
    { label: 'Living space', value: `${sqft} sq.ft` },
    { label: 'Completion year', value: completionYear || yearBuilt || '2020' },
    { label: 'Floors', value: floors || '2' },
    { label: 'Bedrooms', value: bedRooms || bedrooms || '4' }
  ]

  // Check wishlist status
  useEffect(() => {
    if (property?._id) {
      checkWishlistStatus()
    }
  }, [property])

  const checkWishlistStatus = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch('http://localhost:4000/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.success) {
        setIsInWishlist(data.data.some(item => item._id === property._id))
      }
    } catch (error) {
      console.error('Error checking wishlist:', error)
    }
  }

  const toggleWishlist = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to add properties to your wishlist')
      navigate('/login')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:4000/api/wishlist/toggle/${property._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      
      if (response.status === 401) {
        alert('Please login to add properties to your wishlist')
        navigate('/login')
        return
      }

      if (data.success) {
        setIsInWishlist(data.data.isInWishlist)
        // Show success message
        const message = data.data.isInWishlist ? 'Added to wishlist!' : 'Removed from wishlist'
        alert(message)
      } else {
        alert(data.message || 'Failed to update wishlist')
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error)
      alert('Failed to update wishlist. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-500 text-sm mb-4">
                Offering modern luxury with state-of-the-art facilities and home features, 
                this home features high ceilings, large windows, and a modern design.
              </p>
              <div className="text-3xl font-bold text-gray-900 mb-4">
                {formatPrice(price)}
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Request quote
                </button>
                <button
                  onClick={toggleWishlist}
                  disabled={isLoading}
                  className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isInWishlist 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Loading...' : isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden">
              <img
                src={images[0] || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'}
                alt={title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Additional Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={images[1] || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80'}
                  alt="Interior 1"
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={images[2] || 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80'}
                  alt="Interior 2"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Details</h2>
              
              <div className="space-y-4">
                {detailsData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{item.value}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Property Grid Preview */}
        <div className="mt-16">
          <div className="bg-green-100 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Find homes that perfectly match your lifestyle
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mini property cards */}
              {[
                { title: 'Sunset bluff', price: 22500, beds: 2, baths: 2, sqft: 1850, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80' },
                { title: 'Silver birch', price: 12000, beds: 4, baths: 4, sqft: 1450, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80' },
                { title: 'Nova residence', price: 14500, beds: 3, baths: 3, sqft: 1550, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80' }
              ].map((prop, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={prop.img} alt={prop.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-400 text-sm mb-2">{prop.title}</h3>
                    <div className="text-xl font-bold text-gray-900 mb-3">
                      ${prop.price.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{prop.beds}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{prop.baths}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        <span>{prop.sqft} sq.ft</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
