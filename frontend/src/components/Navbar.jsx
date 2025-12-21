import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User, Heart, LogOut, ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showServicesDropdown, setShowServicesDropdown] = useState(false)
  const [showLocalitiesDropdown, setShowLocalitiesDropdown] = useState(false)
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  
  const servicesRef = useRef(null)
  const localitiesRef = useRef(null)
  const loginRef = useRef(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setShowServicesDropdown(false)
      }
      if (localitiesRef.current && !localitiesRef.current.contains(event.target)) {
        setShowLocalitiesDropdown(false)
      }
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLoginDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Buy', path: '/buy' },
    { name: 'Rent', path: '/rent' },
  ]

  const servicesLinks = [
    { name: 'Buyers & Investors', path: '/services/buyers-investors' },
    { name: 'Sellers', path: '/services/sellers' },
    { name: 'Investment Advisory', path: '/services/investment-advisory' },
    { name: 'Landlords', path: '/services/landlords' },
    { name: 'Loan Assistance', path: '/services/loan-assistance' },
    { name: 'Legal Documentation', path: '/services/legal-documentation' },
  ]

  const localitiesLinks = [
    { name: 'Charkop Sector 1', path: '/localities/charkop-sector-1' },
    { name: 'Charkop Sector 2', path: '/localities/charkop-sector-2' },
    { name: 'Charkop Sector 3', path: '/localities/charkop-sector-3' },
    { name: 'Charkop Sector 8', path: '/localities/charkop-sector-8' },
    { name: 'Kandivali West', path: '/localities/kandivali-west' },
    { name: 'Borivali West', path: '/localities/borivali-west' },
    { name: 'Borivali East', path: '/localities/borivali-east' },
    { name: 'View All Localities', path: '/localities' },
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
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-300 bg-gray-900">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/images/Logo.png" 
              alt="Patkar's Realty" 
              className="h-28 lg:h-32 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium transition-colors whitespace-nowrap hover:opacity-80"
                style={{ color: isActive(link.path) ? '#D4AF37' : '#C0C0C0' }}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => {
                  setShowServicesDropdown(!showServicesDropdown)
                  setShowLocalitiesDropdown(false)
                  setShowLoginDropdown(false)
                }}
                className="flex items-center space-x-1 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: location.pathname.startsWith('/services') ? '#D4AF37' : '#C0C0C0' }}
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showServicesDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showServicesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50">
                  {servicesLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setShowServicesDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Localities Dropdown */}
            <div className="relative" ref={localitiesRef}>
              <button
                onClick={() => {
                  setShowLocalitiesDropdown(!showLocalitiesDropdown)
                  setShowServicesDropdown(false)
                  setShowLoginDropdown(false)
                }}
                className="flex items-center space-x-1 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: location.pathname.startsWith('/localities') ? '#D4AF37' : '#C0C0C0' }}
              >
                <span>Localities</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showLocalitiesDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showLocalitiesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                  {localitiesLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setShowLocalitiesDropdown(false)}
                      className={`block px-4 py-2 text-sm hover:bg-gray-50 ${
                        link.name === 'View All Localities' 
                          ? 'text-blue-600 font-medium border-t border-gray-100 mt-1 pt-3' 
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="text-sm font-medium transition-colors whitespace-nowrap hover:opacity-80"
              style={{ color: isActive('/about') ? '#D4AF37' : '#C0C0C0' }}
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium transition-colors whitespace-nowrap hover:opacity-80"
              style={{ color: isActive('/contact') ? '#D4AF37' : '#C0C0C0' }}
            >
              Contact
            </Link>
            
            {/* Login Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors hover:bg-blue-800"
                  style={{ backgroundColor: 'rgba(0, 31, 84, 0.8)' }}
                >
                  <User className="h-4 w-4" style={{ color: '#D4AF37' }} />
                  <span className="text-sm font-medium" style={{ color: '#D4AF37' }}>{user.fullName?.split(' ')[0]}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <Link to="/wishlist" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => setShowUserMenu(false)}>
                      <Heart className="h-4 w-4" /><span>Wishlist</span>
                    </Link>
                    <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => setShowUserMenu(false)}>
                      <User className="h-4 w-4" /><span>Profile</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50">
                      <LogOut className="h-4 w-4" /><span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative" ref={loginRef}>
                <button
                  onClick={() => {
                    setShowLoginDropdown(!showLoginDropdown)
                    setShowServicesDropdown(false)
                    setShowLocalitiesDropdown(false)
                  }}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37', color: '#001F54' }}
                >
                  <span className="text-sm">Login</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showLoginDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showLoginDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-2 z-50">
                    <Link to="/login?type=buyer" onClick={() => setShowLoginDropdown(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">Buyer Login</Link>
                    <Link to="/login?type=seller" onClick={() => setShowLoginDropdown(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">Seller Login</Link>
                    <Link to="/login?type=agent" onClick={() => setShowLoginDropdown(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">Agent Login</Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-3 rounded-lg transition-colors hover:bg-blue-800">
              {isOpen ? <X className="h-6 w-6" style={{ color: '#D4AF37' }} /> : <Menu className="h-6 w-6" style={{ color: '#D4AF37' }} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden rounded-lg mt-2 pb-4 bg-gray-900">
            <div className="py-2 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-800"
                  style={{ color: isActive(link.path) ? '#D4AF37' : '#C0C0C0' }}>
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Services */}
              <div className="px-4 py-2">
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#D4AF37' }}>Services</div>
                {servicesLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                    className="block py-1.5 text-sm transition-colors hover:opacity-80" style={{ color: '#C0C0C0' }}>
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Localities */}
              <div className="px-4 py-2">
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#D4AF37' }}>Localities</div>
                {localitiesLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                    className="block py-1.5 text-sm transition-colors hover:opacity-80" style={{ color: '#C0C0C0' }}>
                    {link.name}
                  </Link>
                ))}
              </div>

              <Link to="/about" onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-800"
                style={{ color: isActive('/about') ? '#D4AF37' : '#C0C0C0' }}>
                About
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-800"
                style={{ color: isActive('/contact') ? '#D4AF37' : '#C0C0C0' }}>
                Contact
              </Link>

              {/* Mobile Auth */}
              <div className="border-t border-blue-800 mt-2 pt-2 px-4">
                {user ? (
                  <>
                    <div className="py-2 text-sm" style={{ color: '#808080' }}>
                      Signed in as <span className="font-medium" style={{ color: '#D4AF37' }}>{user.fullName}</span>
                    </div>
                    <button onClick={handleLogout} className="flex items-center space-x-2 py-2 text-red-400">
                      <LogOut className="h-4 w-4" /><span>Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="space-y-2 py-2">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#D4AF37' }}>Login As</div>
                    <Link to="/login?type=buyer" onClick={() => setIsOpen(false)} className="block py-1.5 text-sm" style={{ color: '#C0C0C0' }}>Buyer</Link>
                    <Link to="/login?type=seller" onClick={() => setIsOpen(false)} className="block py-1.5 text-sm" style={{ color: '#C0C0C0' }}>Seller</Link>
                    <Link to="/login?type=agent" onClick={() => setIsOpen(false)} className="block py-1.5 text-sm" style={{ color: '#C0C0C0' }}>Agent</Link>
                  </div>
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