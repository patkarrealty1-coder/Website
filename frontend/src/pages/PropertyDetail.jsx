import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PropertyDetails from '../components/PropertyDetails'
import PropertyGrid from '../components/PropertyGrid'
import { ArrowLeft } from 'lucide-react'

const PropertyDetail = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [similarProperties, setSimilarProperties] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data for the specific property
  const mockProperty = {
    _id: id,
    title: 'Crestview estate',
    price: 270000,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 2450,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80'
    ],
    yearBuilt: 2020,
    completionYear: '2020',
    floors: '2',
    bedRooms: '4'
  }

  // Mock similar properties
  const mockSimilarProperties = [
    {
      _id: '2',
      title: 'Sunset bluff',
      price: 22500,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1850,
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80']
    },
    {
      _id: '3',
      title: 'Silver birch',
      price: 12000,
      bedrooms: 4,
      bathrooms: 4,
      sqft: 1450,
      images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80']
    },
    {
      _id: '4',
      title: 'Nova residence',
      price: 14500,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 1550,
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80']
    }
  ]

  useEffect(() => {
    // Simulate API call to fetch property details
    setTimeout(() => {
      setProperty(mockProperty)
      setSimilarProperties(mockSimilarProperties)
      setLoading(false)
    }, 1000)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            {/* Back button skeleton */}
            <div className="h-10 w-32 bg-gray-300 rounded mb-8"></div>
            
            {/* Image gallery skeleton */}
            <div className="h-96 md:h-[500px] bg-gray-300 rounded-xl mb-8"></div>
            
            {/* Content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-12 bg-gray-300 rounded w-1/4"></div>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-24 bg-gray-300 rounded"></div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-gray-300 rounded-xl"></div>
                <div className="h-48 bg-gray-300 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/listings" className="btn-primary">
            Back to Listings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Property Details */}
      <PropertyDetails property={property} />
    </div>
  )
}

export default PropertyDetail
