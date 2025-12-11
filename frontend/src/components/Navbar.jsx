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
  const isDarkNavbar = ['/residential', '/commercial', '/listings', '/contact', '/blog', '/wishlist', '/profile', '/setup', '/completed-projects', '/ongoing-projects'].includes(location.pathname) || location.pathname.startsWith('/admin') || location.pathname.startsWith('/property/')

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
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-300" style={{ backgroundColor: '#001F54' }}>
      <div className="w-full px-6 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl font-bold" style={{ color: '#D4AF37' }}>Patkar's Realty</span>
          </Link>

          {/* Desktop Navigation - Fixed Positioning */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-base font-medium transition-colors whitespace-nowrap hover:opacity-80"
                style={{
                  minWidth: 'fit-content',
                  display: 'inline-block',
                  color: isActive(link.path) ? '#D4AF37' : '#808080'
                }}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Auth Buttons / User Menu - Fixed Width */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors hover:bg-blue-800"
                  style={{
                    minWidth: '120px',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 31, 84, 0.8)'
                  }}
                >
                  <User className="h-5 w-5" style={{ color: '#D4AF37' }} />
                  <span className="font-medium" style={{ color: '#D4AF37' }}>{user.fullName?.split(' ')[0]}</span>
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
                  className="font-medium transition-colors hover:opacity-80"
                  style={{
                    minWidth: '50px',
                    textAlign: 'center',
                    color: '#808080'
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
                  style={{
                    minWidth: '100px',
                    textAlign: 'center',
                    backgroundColor: '#D4AF37',
                    color: '#001F54'
                  }}
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
              className="p-3 rounded-lg transition-colors hover:bg-blue-800"
            >
              {isOpen ? 
                <X className="h-7 w-7" style={{ color: '#D4AF37' }} /> : 
                <Menu className="h-7 w-7" style={{ color: '#D4AF37' }} />
              }
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden rounded-lg mt-2" style={{ backgroundColor: '#001F54' }}>
            <div className="py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-medium transition-colors hover:bg-blue-800"
                  style={{ 
                    color: isActive(link.path) ? '#D4AF37' : '#808080',
                    backgroundColor: isActive(link.path) ? 'rgba(0, 31, 84, 0.8)' : 'transparent'
                  }}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Auth Links */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-sm" style={{ color: '#808080' }}>
                      Signed in as <span className="font-medium" style={{ color: '#D4AF37' }}>{user.fullName}</span>
                    </div>
                    <Link
                      to="/wishlist"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 transition-colors hover:bg-blue-800"
                      style={{ color: '#808080' }}
                    >
                      <Heart className="h-4 w-4" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 transition-colors hover:bg-blue-800"
                      style={{ color: '#808080' }}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-3 text-red-400 hover:bg-blue-800 transition-colors"
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
                      className="block px-4 py-3 transition-colors hover:bg-blue-800"
                      style={{ color: '#808080' }}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 font-medium transition-colors hover:bg-blue-800"
                      style={{ color: '#D4AF37' }}
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
