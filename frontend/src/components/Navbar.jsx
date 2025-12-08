import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User, Heart, LogOut } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Determine if we're on a page that needs dark navbar (light background)
  const isDarkNavbar = ['/residential', '/commercial', '/listings', '/contact', '/blog', '/wishlist', '/profile', '/login', '/register', '/setup', '/completed-projects', '/ongoing-projects'].includes(location.pathname) || location.pathname.startsWith('/admin') || location.pathname.startsWith('/property/')

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Residential Properties', path: '/residential' },
    { name: 'Commercial Properties', path: '/commercial' },
    { name: 'Completed Projects', path: '/completed-projects' },
    { name: 'Ongoing Projects', path: '/ongoing-projects' },
    { name: 'Your AI Real Estate Agent', path: '/ai-agent' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setShowUserMenu(false)
    navigate('/')
    window.location.reload()
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDarkNavbar
        ? 'bg-gradient-to-b from-gray-600 to-gray-500 shadow-lg'
        : isScrolled 
          ? 'bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
    }`}>
      <div className="w-full px-6 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className={`text-3xl font-bold ${isDarkNavbar ? 'text-white' : 'text-white'}`}>Patkar's Realty</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium transition-colors ${
                  isDarkNavbar
                    ? isActive(link.path) 
                      ? 'text-white' 
                      : 'text-gray-100 hover:text-white'
                    : isActive(link.path) 
                      ? 'text-white' 
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Auth Buttons / User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isDarkNavbar
                      ? 'bg-gray-500 hover:bg-gray-400'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <User className={`h-5 w-5 ${isDarkNavbar ? 'text-white' : 'text-white'}`} />
                  <span className={`font-medium ${isDarkNavbar ? 'text-white' : 'text-white'}`}>{user.fullName?.split(' ')[0]}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                    <Link
                      to="/wishlist"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Heart className="h-4 w-4" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`font-medium transition-colors ${
                    isDarkNavbar
                      ? 'text-gray-100 hover:text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isDarkNavbar
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-3 rounded-lg transition-colors ${
                isDarkNavbar
                  ? 'hover:bg-gray-500'
                  : 'hover:bg-white/10'
              }`}
            >
              {isOpen ? 
                <X className={`h-7 w-7 ${isDarkNavbar ? 'text-white' : 'text-white'}`} /> : 
                <Menu className={`h-7 w-7 ${isDarkNavbar ? 'text-white' : 'text-white'}`} />
              }
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2">
            <div className="py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-gray-900 bg-gray-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Auth Links */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-sm text-gray-500">
                      Signed in as <span className="font-medium text-gray-900">{user.fullName}</span>
                    </div>
                    <Link
                      to="/wishlist"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <Heart className="h-4 w-4" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-3 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-blue-600 font-medium hover:bg-blue-50"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
