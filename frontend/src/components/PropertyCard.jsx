import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bed, Bath, Square, Heart } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const PropertyCard = ({ property, index = 0 }) => {
  const navigate = useNavigate()
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {
    _id,
    title,
    price,
    bedrooms,
    bathrooms,
    sqft,
    images
  } = property

  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, once: true })

  // Check if property is in wishlist on mount
  useEffect(() => {
    if (_id) {
      checkWishlistStatus()
    }
  }, [_id])

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
        setIsInWishlist(data.data.some(item => item._id === _id))
      }
    } catch (error) {
      console.error('Error checking wishlist:', error)
    }
  }

  const showToast = (message, type = 'success') => {
    // Create toast element
    const toast = document.createElement('div')
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform translate-x-full ${
      type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`
    toast.textContent = message
    
    document.body.appendChild(toast)
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)'
    }, 100)
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(full)'
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 3000)
  }

  const toggleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const token = localStorage.getItem('token')
    if (!token) {
      showToast('Please login to add properties to your wishlist', 'info')
      navigate('/login')
      return
    }

    setIsLoading(true)

    try {
      console.log('Toggling wishlist for property:', _id)
      const response = await fetch(`http://localhost:4000/api/wishlist/toggle/${_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      console.log('Toggle response status:', response.status)
      const data = await response.json()
      console.log('Toggle response data:', data)
      
      if (response.status === 401) {
        showToast('Please login to add properties to your wishlist', 'info')
        navigate('/login')
        return
      }

      if (data.success) {
        setIsInWishlist(data.data.isInWishlist)
        // Show success message
        const message = data.data.isInWishlist ? 'Added to wishlist!' : 'Removed from wishlist'
        console.log('Wishlist updated:', message)
        showToast(message, 'success')
      } else {
        console.error('Failed to update wishlist:', data.message)
        showToast(data.message || 'Failed to update wishlist', 'error')
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error)
      showToast('Failed to update wishlist. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(3)}`
    }
    return `$${price.toLocaleString()}`
  }

  return (
    <div 
      className="group block h-full"
      ref={ref}
    >
      <div className={`bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col scroll-fade-in scroll-stagger-${(index % 6) + 1} ${isVisible ? 'visible' : ''}`}>
        {/* Image Container - Reduced height on mobile */}
        <Link to={`/property/${_id}`}>
          <div className="relative overflow-hidden aspect-[16/10] md:aspect-[4/3]">
            <img
              src={images?.[0]?.url || images?.[0] || '/images/property-thumbnail.svg'}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Wishlist Heart Icon - Top Right */}
            <button
              onClick={toggleWishlist}
              disabled={isLoading}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all z-10"
            >
              <Heart 
                className={`h-4 w-4 md:h-5 md:w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
          </div>
        </Link>
        
        {/* Content - Compact spacing */}
        <div className="p-3 md:p-5 flex flex-col flex-grow">
          {/* Property Type Badge */}
          <div className="mb-1.5 md:mb-2">
            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] md:text-xs font-medium rounded uppercase tracking-wide">
              {property.propertyType || 'Apartments'}
            </span>
          </div>

          {/* Title - Responsive sizing */}
          <Link to={`/property/${_id}`}>
            <h3 className="text-gray-900 text-base md:text-lg font-bold mb-1.5 md:mb-2 hover:text-gray-700 line-clamp-1">
              {title}
            </h3>
          </Link>
          
          {/* Description - Limited to 2 lines with ellipsis */}
          <p className="text-gray-500 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2 leading-relaxed">
            {property.description || 'Located by the marina, this development blends elegant design with leisure facilities, lush surroundings, and easy access to vibrant retail and dining destinations.'}
          </p>
          
          {/* Property Details Grid - Compact */}
          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4 text-xs md:text-sm">
            {/* Price Range */}
            <div className="flex items-start gap-1.5">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <div className="text-[10px] md:text-xs text-gray-500">Price Range</div>
                <div className="font-semibold text-gray-900">${formatPrice(price)}</div>
              </div>
            </div>

            {/* Units */}
            <div className="flex items-start gap-1.5">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <div>
                <div className="text-[10px] md:text-xs text-gray-500">Units</div>
                <div className="font-semibold text-gray-900">{bedrooms}-{bedrooms + 1}BR</div>
              </div>
            </div>

            {/* Size */}
            <div className="flex items-start gap-1.5">
              <Square className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[10px] md:text-xs text-gray-500">Size</div>
                <div className="font-semibold text-gray-900">{sqft.toLocaleString()} sq. ft.</div>
              </div>
            </div>

            {/* Year */}
            <div className="flex items-start gap-1.5">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="text-[10px] md:text-xs text-gray-500">Year</div>
                <div className="font-semibold text-gray-900">{property.yearBuilt || '2027'}</div>
              </div>
            </div>
          </div>

          {/* Action Button - Single Imperial Green Button */}
          <div className="mt-auto flex justify-center">
            <Link
              to={`/property/${_id}`}
              className="inline-block py-2 md:py-2.5 px-6 md:px-8 bg-green-800 text-white text-xs md:text-sm font-semibold rounded-lg hover:bg-green-900 transition-all text-center"
            >
              I AM INTERESTED
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard

