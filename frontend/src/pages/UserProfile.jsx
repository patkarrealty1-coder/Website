import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Edit3,
  Heart,
  Calendar,
  MapPin,
  DollarSign,
  Home,
  TrendingUp,
  Clock,
  CheckCircle,
  X,
  Star
} from 'lucide-react'

const UserProfile = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [visitTab, setVisitTab] = useState('planned')
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    profileImage: '',
    preferences: {
      preferredLocations: [],
      budgetRange: { min: 0, max: 0 },
      propertyTypes: []
    }
  })

  const [wishlist, setWishlist] = useState([])
  const [siteVisits, setSiteVisits] = useState([])
  const [insights, setInsights] = useState({})
  const [editForm, setEditForm] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    fetchUserData()
  }, [navigate])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')

      const [profileRes, wishlistRes, siteVisitsRes, insightsRes] = await Promise.all([
        fetch('http://localhost:4000/api/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:4000/api/wishlist', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:4000/api/sitevisits', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:4000/api/user/insights', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      const profileData = await profileRes.json()
      const wishlistData = await wishlistRes.json()
      const siteVisitsData = await siteVisitsRes.json()
      const insightsData = await insightsRes.json()

      if (profileData.success) {
        setProfile(profileData.data)
        setEditForm(profileData.data)
      }
      if (wishlistData.success) setWishlist(wishlistData.data)
      if (siteVisitsData.success) setSiteVisits(siteVisitsData.data)
      if (insightsData.success) setInsights(insightsData.data)

    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:4000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      })

      const data = await response.json()
      if (data.success) {
        setProfile(data.data)
        setEditMode(false)
        alert('Profile updated successfully!')
      } else {
        alert('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile')
    }
  }

  const handleRemoveFromWishlist = async (propertyId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:4000/api/wishlist/${propertyId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        setWishlist(wishlist.filter(item => item._id !== propertyId))
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error)
    }
  }

  const handleMarkVisitCompleted = async (visitId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:4000/api/sitevisits/${visitId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'completed' })
      })

      if (response.ok) {
        fetchUserData() // Refresh data
      }
    } catch (error) {
      console.error('Error updating visit:', error)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredVisits = siteVisits.filter(visit => visit.status === visitTab)

  const generateInsightSummary = (insights) => {
    if (!insights.totalWishlistItems) return "Start shortlisting properties to see personalized insights."

    const topLocation = insights.mostPreferredLocations?.[0]?.location || "various locations"
    const topPropertyType = insights.commonPropertyTypes?.[0]?.type || "properties"
    const avgPrice = insights.averagePriceRange?.average

    let summary = `You seem most interested in ${topPropertyType.toLowerCase()} in ${topLocation}`

    if (avgPrice) {
      const priceRange = formatPrice(avgPrice)
      summary += ` within ${priceRange} range`
    }

    summary += `. You have shortlisted ${insights.totalWishlistItems} properties`

    if (insights.completedVisits > 0) {
      summary += ` and completed ${insights.completedVisits} site visits`
    }

    summary += ". This data helps us provide better recommendations for you."

    return summary
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <User className="h-8 w-8 text-blue-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.fullName}</h1>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'wishlist', label: 'Shortlisted Properties', icon: Heart },
              { id: 'visits', label: 'Site Visits', icon: Calendar },
              { id: 'insights', label: 'Insights', icon: TrendingUp }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900"
              >
                <Edit3 className="h-4 w-4" />
                {editMode ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {editMode ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={editForm.fullName || ''}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={editForm.bio || ''}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Locations</label>
                  <input
                    type="text"
                    value={editForm.preferences?.preferredLocations?.join(', ') || ''}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      preferences: {
                        ...editForm.preferences,
                        preferredLocations: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Mumbai, Pune, Bangalore"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (Min)</label>
                    <input
                      type="number"
                      value={editForm.preferences?.budgetRange?.min || ''}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        preferences: {
                          ...editForm.preferences,
                          budgetRange: {
                            ...editForm.preferences?.budgetRange,
                            min: parseInt(e.target.value) || 0
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="5000000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (Max)</label>
                    <input
                      type="number"
                      value={editForm.preferences?.budgetRange?.max || ''}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        preferences: {
                          ...editForm.preferences,
                          budgetRange: {
                            ...editForm.preferences?.budgetRange,
                            max: parseInt(e.target.value) || 0
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="15000000"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleUpdateProfile}
                    className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Full Name</label>
                    <p className="mt-1 text-lg text-gray-900">{profile.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1 text-lg text-gray-900">{profile.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                    <p className="mt-1 text-lg text-gray-900">{profile.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Bio</label>
                  <p className="mt-1 text-gray-900">{profile.bio || 'No bio provided'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Preferred Locations</label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {profile.preferences?.preferredLocations?.length > 0 ? (
                      profile.preferences.preferredLocations.map((location, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {location}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No preferences set</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Budget Range</label>
                  <p className="mt-1 text-lg text-gray-900">
                    {profile.preferences?.budgetRange?.min && profile.preferences?.budgetRange?.max
                      ? `${formatPrice(profile.preferences.budgetRange.min)} - ${formatPrice(profile.preferences.budgetRange.max)}`
                      : 'Not specified'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Shortlisted Properties ({wishlist.length})</h2>

            {wishlist.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties shortlisted</h3>
                <p className="text-gray-500">Start exploring properties and add them to your wishlist</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map(property => (
                  <div key={property._id} className="bg-white rounded-lg shadow overflow-hidden">
                    <img
                      src={property.images?.[0]?.url || '/images/property-thumbnail.svg'}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{property.title}</h3>
                      <p className="text-lg font-bold text-blue-600 mb-2">{formatPrice(property.price)}</p>
                      <p className="text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        {property.location?.city}
                      </p>
                      <button
                        onClick={() => handleRemoveFromWishlist(property._id)}
                        className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center justify-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Remove from Wishlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Site Visits Tab */}
        {activeTab === 'visits' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Site Visits</h2>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setVisitTab('planned')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${visitTab === 'planned'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Clock className="h-4 w-4 inline mr-2" />
                  Planned ({siteVisits.filter(v => v.status === 'planned').length})
                </button>
                <button
                  onClick={() => setVisitTab('completed')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${visitTab === 'completed'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  Completed ({siteVisits.filter(v => v.status === 'completed').length})
                </button>
              </div>
            </div>

            {filteredVisits.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {visitTab} visits
                </h3>
                <p className="text-gray-500">
                  {visitTab === 'planned'
                    ? 'Schedule your first property visit'
                    : 'Complete some property visits to see them here'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVisits.map(visit => (
                  <div key={visit._id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{visit.property?.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(visit.visitDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {visit.property?.location?.city}
                          </span>
                        </div>
                        {visit.notes && (
                          <p className="text-sm text-gray-600 mb-2">Notes: {visit.notes}</p>
                        )}
                        {visit.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-gray-600">Rating: {visit.rating}/5</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {visit.status === 'planned' && (
                          <button
                            onClick={() => handleMarkVisitCompleted(visit._id)}
                            className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 text-sm"
                          >
                            Mark Completed
                          </button>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${visit.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Your Property Insights</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-3">
                  <Heart className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{insights.totalWishlistItems || 0}</p>
                    <p className="text-sm text-gray-600">Shortlisted Properties</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{insights.totalSiteVisits || 0}</p>
                    <p className="text-sm text-gray-600">Total Site Visits</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{insights.completedVisits || 0}</p>
                    <p className="text-sm text-gray-600">Completed Visits</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{insights.plannedVisits || 0}</p>
                    <p className="text-sm text-gray-600">Planned Visits</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Preferred Locations */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Most Preferred Locations
                </h3>
                {insights.mostPreferredLocations?.length > 0 ? (
                  <div className="space-y-3">
                    {insights.mostPreferredLocations.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-900">{item.location}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {item.count} properties
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No location preferences yet</p>
                )}
              </div>

              {/* Property Types */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Home className="h-5 w-5 text-green-500" />
                  Common Property Types
                </h3>
                {insights.commonPropertyTypes?.length > 0 ? (
                  <div className="space-y-3">
                    {insights.commonPropertyTypes.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-900">{item.type}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {item.count} properties
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No property type preferences yet</p>
                )}
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-purple-500" />
                  Average Price Range
                </h3>
                {insights.averagePriceRange?.average > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {formatPrice(insights.averagePriceRange.min)}
                      </p>
                      <p className="text-sm text-gray-600">Minimum</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {formatPrice(insights.averagePriceRange.average)}
                      </p>
                      <p className="text-sm text-gray-600">Average</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">
                        {formatPrice(insights.averagePriceRange.max)}
                      </p>
                      <p className="text-sm text-gray-600">Maximum</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No price data available yet</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
