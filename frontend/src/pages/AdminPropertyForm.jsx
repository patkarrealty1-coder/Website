import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Upload } from 'lucide-react'

const AdminPropertyForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isReview = window.location.pathname.includes('/review/')
  const isEdit = Boolean(id) && !isReview

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Residential',
    listingType: 'Buy',
    propertyType: 'Apartment',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    yearBuilt: '',
    status: 'Available',
    featured: false,
    location: {
      address: '',
      city: '',
      state: '',
      pincode: ''
    },
    listingAgent: {
      name: '',
      email: '',
      phone: ''
    },
    amenities: []
  })

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchingProperty, setFetchingProperty] = useState(false)

  const amenitiesList = [
    'Parking', 'WiFi', 'Gym', 'Security', 'Garden', 'Swimming Pool',
    'Elevator', 'Balcony', 'Air Conditioning', 'Heating', 'Furnished',
    'Pet Friendly', 'Laundry', 'Storage', 'Fireplace', 'Terrace'
  ]

  useEffect(() => {
    if (isEdit || isReview) {
      fetchProperty()
    }
  }, [id, isEdit, isReview])

  const fetchProperty = async () => {
    setFetchingProperty(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:4000/api/properties/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      
      if (data.success) {
        const property = data.data
        
        // Ensure all required fields have default values
        setFormData({
          title: property.title || '',
          description: property.description || '',
          price: property.price || '',
          category: property.category || 'Residential',
          listingType: property.listingType || 'Buy',
          propertyType: property.propertyType || 'Apartment',
          bedrooms: property.bedrooms || '',
          bathrooms: property.bathrooms || '',
          sqft: property.sqft || '',
          yearBuilt: property.yearBuilt || '',
          status: property.status || 'Available',
          featured: property.featured || false,
          location: {
            address: property.location?.address || '',
            city: property.location?.city || '',
            state: property.location?.state || '',
            pincode: property.location?.pincode || ''
          },
          listingAgent: {
            name: property.listingAgent?.name || '',
            email: property.listingAgent?.email || '',
            phone: property.listingAgent?.phone || ''
          },
          amenities: property.amenities || []
        })
        
        console.log('Property data loaded:', property)
      } else {
        console.error('Failed to fetch property:', data.message)
        alert('Failed to load property data: ' + (data.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error fetching property:', error)
      alert('Error loading property data. Please try again.')
    } finally {
      setFetchingProperty(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      if (isReview) {
        // For review mode, update approval status and activate property
        const response = await fetch(`http://localhost:4000/api/properties/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            approvalStatus: 'approved',
            isActive: true
          })
        })

        const data = await response.json()

        if (data.success) {
          alert('Property approved and published successfully!')
          navigate('/management/pending-properties')
        } else {
          alert(data.message || 'Error approving property')
        }
      } else {
        // Normal create/edit flow
        const formDataToSend = new FormData()

        // Append all form fields
        Object.keys(formData).forEach(key => {
          if (typeof formData[key] === 'object' && !Array.isArray(formData[key])) {
            formDataToSend.append(key, JSON.stringify(formData[key]))
          } else if (Array.isArray(formData[key])) {
            formDataToSend.append(key, JSON.stringify(formData[key]))
          } else {
            formDataToSend.append(key, formData[key])
          }
        })

        // Append images
        images.forEach(image => {
          formDataToSend.append('propertyImages', image)
        })

        const url = isEdit
          ? `http://localhost:4000/api/properties/${id}`
          : 'http://localhost:4000/api/properties'

        const response = await fetch(url, {
          method: isEdit ? 'PUT' : 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataToSend
        })

        const data = await response.json()

        if (data.success) {
          alert(isEdit ? 'Property updated successfully!' : 'Property created successfully!')
          navigate('/management/properties')
        } else {
          alert(data.message || 'Error saving property')
        }
      }
    } catch (error) {
      console.error('Error saving property:', error)
      alert('Error saving property')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to={isReview ? "/management/pending-properties" : "/management/properties"} 
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isReview ? 'Review Property' : isEdit ? 'Edit Property' : 'Add New Property'}
          </h1>
        </div>

        {/* Warning Banner for Review Mode */}
        {isReview && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-yellow-900 mb-1">
                  Auto-extracted content - please verify before publishing
                </h3>
                <p className="text-sm text-yellow-800">
                  This property was submitted via API. Please review all information carefully and make any necessary corrections before approving.
                </p>
              </div>
            </div>
          </div>
        )}

        {fetchingProperty ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading property data...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {formData.category === 'Residential' ? (
                    <>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="House">House</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Plot">Plot</option>
                    </>
                  ) : (
                    <>
                      <option value="Office">Office</option>
                      <option value="Shop">Shop</option>
                      <option value="Retail">Retail</option>
                      <option value="Warehouse">Warehouse</option>
                      <option value="Co-working">Co-working</option>
                    </>
                  )}
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Square Feet</label>
                <input
                  type="number"
                  name="sqft"
                  value={formData.sqft}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                  <option value="Under Contract">Under Contract</option>
                  <option value="Off Market">Off Market</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Featured Property</label>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-xl font-bold mb-4">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="location.pincode"
                  value={formData.location.pincode}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Agent Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Listing Agent</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="listingAgent.name"
                  value={formData.listingAgent.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="listingAgent.email"
                  value={formData.listingAgent.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="listingAgent.phone"
                  value={formData.listingAgent.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {amenitiesList.map(amenity => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="text-xl font-bold mb-4">Images</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <label className="flex flex-col items-center cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Click to upload images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{images.length} file(s) selected</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-6 py-3 text-white rounded-lg disabled:bg-gray-400 ${
                isReview 
                  ? 'bg-green-800 hover:bg-green-900' 
                  : 'bg-green-800 hover:bg-green-900'
              }`}
            >
              {loading 
                ? 'Saving...' 
                : isReview 
                  ? '✓ Approve & Publish' 
                  : isEdit 
                    ? 'Update Property' 
                    : 'Create Property'
              }
            </button>
            <Link
              to={isReview ? "/management/pending-properties" : "/management/properties"}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
        )}
      </div>
    </div>
  )
}

export default AdminPropertyForm

