import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  User, 
  Edit3, 
  Heart, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Home,
  Clock,
  CheckCircle,
  X,
  Star,
  Eye,
  Plus,
  Download,
  MessageCircle,
  Building,
  Camera
} from 'lucide-react'

const UserProfileModern = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    profileImage: '',
    preferences: {
      propertyType: 'Residential',
      preferredLocations: [],
      budgetRange: { min: 0, max: 0 }
    }
  })
  
  const [wishlist, setWishlist] = useState([])
  const [siteVisits, setSiteVisits] = useState([])
  const [rentals, setRentals] = useState([])
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
      
      const [profileRes, wishlistRes, siteVisitsRes] = await Promise.all([
        fetch('http://localhost:4000/api/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:4000/api/wishlist', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:4000/api/sitevisits', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      const profileData = await profileRes.json()
      const wishlistData = await wishlistRes.json()
      const siteVisitsData = await siteVisitsRes.json()

      if (profileData.success) {
        setProfile(profileData.data)
        setEditForm(profileData.data)
      }
      if (wishlistData.success) setWishlist(wishlistData.data)
      if (siteVisitsData.success) setSiteVisits(siteVisitsData.data)
      
      // Mock rental data for demo
      setRentals([
        {
          id: 1,
          propertyName: "Luxury Apartment in Bandra",
          rentAmount: 45000,
          startDate: "2024-01-15",
          endDate: "2024-12-15",
          status: "Active"
        },
        {
          id: 2,
          propertyName: "Office Space in Andheri",
          rentAmount: 85000,
          startDate: "2023-06-01",
          endDate: "2024-05-31",
          status: "Completed"
        }
      ])
      
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
        // Show success toast
        showToast('Profile updated successfully!', 'success')
      } else {
        showToast('Failed to update profile', 'error')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      showToast('Error updating profile', 'error')
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
        showToast('Property removed from wishlist', 'success')
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
        showToast('Visit marked as completed', 'success')
      }
    } catch (error) {
      console.error('Error updating visit:', error)
    }
  }

  const showToast = (message, type = 'success') => {
    // Simple toast notification
    const toast = document.createElement('div')
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform translate-x-full ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`
    toast.textContent = message
    
    document.body.appendChild(toast)
    
    setTimeout(() => {
      toast.style.transform = 'translateX(0)'
    }, 100)
    
    setTimeout(() => {
      toast.style.transform = 'translateX(full)'
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 3000)
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

  const upcomingVisits = siteVisits.filter(visit => visit.status === 'planned')
  const completedVisits = siteVisits.filter(visit => visit.status === 'completed')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-gray-600 font-medium">Loading your profile...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                {profile.profileImage ? (
                  <img src={profile.profileImage} alt="Profile" className="w-20 h-20 rounded-2xl object-cover" />
                ) : (
                  <User className="h-10 w-10 text-white" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.fullName || 'Welcome!'}</h1>
              <p className="text-blue-600 font-medium">{profile.email}</p>
              <p className="text-gray-500 text-sm mt-1">{profile.bio || 'Complete your profile to get personalized recommendations'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'shortlisted', label: 'Shortlisted', icon: Heart },
              { id: 'meetings', label: 'Meetings / Site Visits', icon: Calendar },
              { id: 'rentals', label: 'Rentals', icon: Building }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 py-4 px-2 border-b-3 font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
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
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Edit3 className="h-4 w-4" />
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {editMode ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                      <input
                        type="text"
                        value={editForm.fullName || ''}
                        onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Phone</label>
                      <input
                        type="tel"
                        value={editForm.phone || ''}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Bio</label>
                    <textarea
                      value={editForm.bio || ''}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Property Type</label>
                      <select
                        value={editForm.preferences?.propertyType || 'Residential'}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          preferences: {
                            ...editForm.preferences,
                            propertyType: e.target.value
                          }
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="Rental">Rental</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Budget Min (₹)</label>
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
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="5000000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Budget Max (₹)</label>
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
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="15000000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Preferred Locations</label>
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Mumbai, Pune, Bangalore"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleUpdateProfile}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-500 mb-2">Full Name</label>
                        <p className="text-xl text-gray-900 font-medium">{profile.fullName || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-500 mb-2">Email</label>
                        <p className="text-xl text-gray-900 font-medium">{profile.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-500 mb-2">Phone</label>
                        <p className="text-xl text-gray-900 font-medium">{profile.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-500 mb-2">Property Type</label>
                        <span className="inline-flex px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {profile.preferences?.propertyType || 'Not specified'}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-500 mb-2">Budget Range</label>
                        <p className="text-xl text-gray-900 font-medium">
                          {profile.preferences?.budgetRange?.min && profile.preferences?.budgetRange?.max
                            ? `${formatPrice(profile.preferences.budgetRange.min)} - ${formatPrice(profile.preferences.budgetRange.max)}`
                            : 'Not specified'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2">Bio</label>
                    <p className="text-gray-900 leading-relaxed">{profile.bio || 'No bio provided'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-3">Preferred Locations</label>
                    <div className="flex flex-wrap gap-2">
                      {profile.preferences?.preferredLocations?.length > 0 ? (
                        profile.preferences.preferredLocations.map((location, index) => (
                          <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium">
                            <MapPin className="h-3 w-3 inline mr-1" />
                            {location}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">No preferences set</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Shortlisted Tab */}
        {activeTab === 'shortlisted' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Shortlisted Properties</h2>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {wishlist.length} Properties
              </span>
            </div>
            
            {wishlist.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No properties shortlisted yet</h3>
                <p className="text-gray-500 mb-6">Start exploring properties and add them to your wishlist</p>
                <Link
                  to="/listings"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Eye className="h-4 w-4" />
                  Browse Properties
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map(property => (
                  <div key={property._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative">
                      <img
                        src={property.images?.[0]?.url || '/images/property-thumbnail.svg'}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => handleRemoveFromWishlist(property._id)}
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-all duration-200"
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">{property.title}</h3>
                      <p className="text-2xl font-bold text-blue-600 mb-3">{formatPrice(property.price)}</p>
                      <p className="text-gray-600 mb-4 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {property.location?.city}
                      </p>
                      <div className="flex gap-3">
                        <Link
                          to={`/property/${property._id}`}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 text-center font-medium"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleRemoveFromWishlist(property._id)}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Meetings / Site Visits Tab */}
        {activeTab === 'meetings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Meetings & Site Visits</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Visits Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <Clock className="h-6 w-6 text-blue-500" />
                    Upcoming Visits
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {upcomingVisits.length}
                  </span>
                </div>

                {upcomingVisits.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="text-gray-500 mb-4">No upcoming visits scheduled</p>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium">
                      <Plus className="h-4 w-4 inline mr-2" />
                      Book New Visit
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingVisits.map(visit => (
                      <div key={visit._id} className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200">
                        <img
                          src={visit.property?.images?.[0]?.url || '/images/property-thumbnail.svg'}
                          alt={visit.property?.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{visit.property?.title}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(visit.visitDate)}
                          </p>
                          <span className="inline-flex px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium mt-2">
                            Planned
                          </span>
                        </div>
                        <button
                          onClick={() => handleMarkVisitCompleted(visit._id)}
                          className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition-all duration-200 text-sm font-medium"
                        >
                          Mark Complete
                        </button>
                      </div>
                    ))}
                    <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium">
                      <Plus className="h-4 w-4 inline mr-2" />
                      Book New Visit
                    </button>
                  </div>
                )}
              </div>

              {/* Completed Visits Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    Completed Visits
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {completedVisits.length}
                  </span>
                </div>

                {completedVisits.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="text-gray-500">No completed visits yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {completedVisits.map(visit => (
                      <div key={visit._id} className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                        <img
                          src={visit.property?.images?.[0]?.url || '/images/property-thumbnail.svg'}
                          alt={visit.property?.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{visit.property?.title}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(visit.visitDate)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              ✅ Completed
                            </span>
                            {visit.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-xs text-gray-600">{visit.rating}/5</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-all duration-200 text-sm font-medium">
                            <MessageCircle className="h-3 w-3 inline mr-1" />
                            Feedback
                          </button>
                          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm font-medium">
                            Revisit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Rentals Tab */}
        {activeTab === 'rentals' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Rentals</h2>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {rentals.length} Contracts
              </span>
            </div>
            
            {rentals.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building className="h-10 w-10 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No rental contracts yet</h3>
                <p className="text-gray-500 mb-6">Your rental agreements will appear here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {rentals.map(rental => (
                  <div key={rental.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{rental.propertyName}</h3>
                        <p className="text-2xl font-bold text-purple-600">{formatPrice(rental.rentAmount)}/month</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        rental.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rental.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Start Date:</span>
                        <span className="font-medium text-gray-900">{formatDate(rental.startDate)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">End Date:</span>
                        <span className="font-medium text-gray-900">{formatDate(rental.endDate)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Contract Status:</span>
                        <span className={`font-medium ${
                          rental.status === 'Active' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {rental.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-medium">
                        <Eye className="h-4 w-4 inline mr-2" />
                        View Property
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium">
                        <Download className="h-4 w-4 inline mr-2" />
                        Contract
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfileModern
