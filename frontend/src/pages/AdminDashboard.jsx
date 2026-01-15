import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, FileText, Briefcase, Users, LogOut, Plus, Sparkles, LogIn, UserCheck } from 'lucide-react'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  const [stats, setStats] = useState({
    properties: 0,
    blogs: 0,
    projects: 0,
    contacts: 0,
    pendingProperties: 0,
    pendingBlogs: 0
  })

  useEffect(() => {
    // Check if user is already authenticated
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')
    
    if (token && user && user.role === 'admin') {
      setIsAuthenticated(true)
      fetchStats()
    }
  }, [])

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }))
    setLoginError('')
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
      })

      const data = await response.json()

      if (data.success && data.data.user.role === 'admin') {
        // Store token and user data
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        
        // Update state
        setIsAuthenticated(true)
        setLoginForm({ email: '', password: '' })
        
        // Fetch stats
        fetchStats()
      } else {
        setLoginError(data.message || 'Invalid credentials or not an admin user')
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginError('An error occurred. Please try again.')
    } finally {
      setLoginLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')

      const [propertiesRes, blogsRes, projectsRes, pendingPropertiesRes, pendingBlogsRes] = await Promise.all([
        fetch('http://localhost:4000/api/properties', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:4000/api/blogs', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:4000/api/projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:4000/api/properties?approvalStatus=pending', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:4000/api/blogs?status=draft', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      const properties = await propertiesRes.json()
      const blogs = await blogsRes.json()
      const projects = await projectsRes.json()
      const pendingProperties = await pendingPropertiesRes.json()
      const pendingBlogs = await pendingBlogsRes.json()

      setStats({
        properties: properties.total || 0,
        blogs: blogs.pagination?.total || 0,
        projects: projects.pagination?.total || 0,
        contacts: 0,
        pendingProperties: pendingProperties.total || 0,
        pendingBlogs: pendingBlogs.total || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setLoginForm({ email: '', password: '' })
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <LogIn className="h-8 w-8 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Management Panel</h2>
              <p className="text-gray-600 mt-2">Admin Login Required</p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{loginError}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  placeholder="admin@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginLoading ? 'Signing in...' : 'Sign In to Management'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Not an admin? <Link to="/" className="text-amber-600 hover:text-amber-700 font-semibold">
                  Go to Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Management Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Properties</p>
                <p className="text-3xl font-bold text-gray-900">{stats.properties}</p>
              </div>
              <Home className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Blog Posts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.blogs}</p>
              </div>
              <FileText className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Projects</p>
                <p className="text-3xl font-bold text-gray-900">{stats.projects}</p>
              </div>
              <Briefcase className="h-12 w-12 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Contacts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.contacts}</p>
              </div>
              <Users className="h-12 w-12 text-orange-500" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg shadow-lg p-6 border-2 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-semibold">Pending Props</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pendingProperties}</p>
              </div>
              <div className="relative">
                <Home className="h-12 w-12 text-orange-500" />
                {stats.pendingProperties > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                    !
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-lg p-6 border-2 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-semibold">Pending Blogs</p>
                <p className="text-3xl font-bold text-purple-600">{stats.pendingBlogs}</p>
              </div>
              <div className="relative">
                <FileText className="h-12 w-12 text-purple-500" />
                {stats.pendingBlogs > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                    !
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pending Properties Alert */}
        {stats.pendingProperties > 0 && (
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border-l-4 border-orange-500 rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 rounded-full p-3">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-orange-900">
                    {stats.pendingProperties} {stats.pendingProperties === 1 ? 'Property' : 'Properties'} Awaiting Review
                  </h3>
                  <p className="text-orange-700">New properties submitted via API need your approval</p>
                </div>
              </div>
              <Link
                to="/management/pending-properties"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Review Pending
              </Link>
            </div>
          </div>
        )}

        {/* Pending Blogs Alert */}
        {stats.pendingBlogs > 0 && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-purple-500 rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-green-800 rounded-full p-3">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-purple-900">
                    {stats.pendingBlogs} {stats.pendingBlogs === 1 ? 'Blog' : 'Blogs'} Awaiting Review
                  </h3>
                  <p className="text-purple-700">New blogs submitted via API need your approval</p>
                </div>
              </div>
              <Link
                to="/management/pending-blogs"
                className="px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-900 font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Review Pending
              </Link>
            </div>
          </div>
        )}

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Properties Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Home className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900">Properties</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage property listings</p>
            <div className="space-y-2">
              <Link
                to="/management/properties"
                className="block w-full px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 text-center"
              >
                View All Properties
              </Link>
              <Link
                to="/management/properties/new"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
              >
                <Plus className="h-4 w-4" />
                Add New Property
              </Link>
              <Link
                to="/management/featured-properties"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
              >
                <Sparkles className="h-4 w-4" />
                Featured Luxury
              </Link>
            </div>
          </div>

          {/* Pending Properties Management */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg shadow-lg border-2 border-orange-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Home className="h-6 w-6 text-orange-500" />
                {stats.pendingProperties > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {stats.pendingProperties}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-orange-900">Pending</h2>
            </div>
            <p className="text-orange-700 mb-4">Review API submissions</p>
            <div className="space-y-2">
              <Link
                to="/management/pending-properties"
                className="block w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-center font-semibold"
              >
                Review Pending
              </Link>
            </div>
          </div>

          {/* Pending Blogs Management */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-lg border-2 border-purple-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <FileText className="h-6 w-6 text-purple-500" />
                {stats.pendingBlogs > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {stats.pendingBlogs}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-purple-900">Pending Blogs</h2>
            </div>
            <p className="text-purple-700 mb-4">Review API submissions</p>
            <div className="space-y-2">
              <Link
                to="/management/pending-blogs"
                className="block w-full px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 text-center font-semibold"
              >
                Review Pending
              </Link>
            </div>
          </div>

          {/* Blogs Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-bold text-gray-900">Blogs</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage blog posts</p>
            <div className="space-y-2">
              <Link
                to="/management/blogs"
                className="block w-full px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 text-center"
              >
                View All Blogs
              </Link>
              <Link
                to="/management/blogs/new"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
              >
                <Plus className="h-4 w-4" />
                Add New Blog
              </Link>
            </div>
          </div>

          {/* Completed Projects Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-6 w-6 text-purple-500" />
              <h2 className="text-xl font-bold text-gray-900">Completed Projects</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage completed projects</p>
            <div className="space-y-2">
              <Link
                to="/management/projects"
                className="block w-full px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 text-center"
              >
                View All Projects
              </Link>
              <Link
                to="/management/projects/new"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
              >
                <Plus className="h-4 w-4" />
                Add New Project
              </Link>
            </div>
          </div>

          {/* Ongoing Projects Management */}
          <div className="bg-white rounded-lg shadow p-6 border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-6 w-6 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-900">Ongoing Projects</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage ongoing projects</p>
            <div className="space-y-2">
              <Link
                to="/management/ongoing-projects"
                className="block w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-center"
              >
                View All Ongoing
              </Link>
              <Link
                to="/management/ongoing-projects/new"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200"
              >
                <Plus className="h-4 w-4" />
                Add New Ongoing
              </Link>
            </div>
          </div>

          {/* Page Content Management */}
          <div className="bg-white rounded-lg shadow p-6 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Page Content</h2>
            </div>
            <p className="text-gray-600 mb-4">Edit FAQ, Contact, About pages</p>
            <div className="space-y-2">
              <Link
                to="/management/page-content"
                className="block w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-center"
              >
                Manage Page Content
              </Link>
            </div>
          </div>

          {/* Leads Management */}
          <div className="bg-white rounded-lg shadow p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Leads</h2>
            </div>
            <p className="text-gray-600 mb-4">View form submissions</p>
            <div className="space-y-2">
              <Link
                to="/management/leads"
                className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center"
              >
                Manage Leads
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

