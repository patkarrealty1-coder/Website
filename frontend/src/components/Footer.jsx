import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const Footer = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false)

  const aboutLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'FAQs', path: '/faq' },
  ]

  const propertyLinks = [
    { name: 'Buy Properties', path: '/buy' },
    { name: 'Rent Properties', path: '/rent' },
    { name: 'Residential', path: '/residential' },
    { name: 'Commercial', path: '/commercial' },
  ]

  const serviceLinks = [
    { name: 'Buyers & Investors', path: '/services/buyers-investors' },
    { name: 'Sellers', path: '/services/sellers' },
    { name: 'Investment Advisory', path: '/services/investment-advisory' },
    { name: 'Landlords', path: '/services/landlords' },
    { name: 'Loan Assistance', path: '/services/loan-assistance' },
    { name: 'Legal Documentation', path: '/services/legal-documentation' },
  ]

  const localityLinks = [
    { name: 'Charkop', path: '/localities/charkop-sector-1' },
    { name: 'Kandivali West', path: '/localities/kandivali-west' },
    { name: 'Borivali West', path: '/localities/borivali-west' },
    { name: 'Borivali East', path: '/localities/borivali-east' },
    { name: 'View All', path: '/localities' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms-conditions' },
    { name: 'Disclaimer', path: '/disclaimer' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
              Patkar's Realty
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              30+ years of trust, integrity, and client-first service in Mumbai's western suburbs.
            </p>
            <div className="mt-4 space-y-2">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm">
                <Phone className="h-4 w-4" /> +91 98765 43210
              </a>
              <a href="mailto:info@patkarsrealty.com" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm">
                <Mail className="h-4 w-4" /> info@patkarsrealty.com
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4 text-white">About</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-white text-sm">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Properties</h3>
            <ul className="space-y-2">
              {propertyLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-white text-sm">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-white text-sm">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Localities */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Localities</h3>
            <ul className="space-y-2">
              {localityLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-white text-sm">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Login */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-white text-sm">{link.name}</Link>
                </li>
              ))}
              <li>
                <Link to="/agent-partnering" className="text-gray-400 hover:text-white text-sm">Agent Partnering</Link>
              </li>
            </ul>
            
            {/* Login Button */}
            <div className="mt-4 relative">
              <button
                onClick={() => setShowLoginOptions(!showLoginOptions)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg text-sm font-medium hover:bg-yellow-400 transition-colors"
              >
                Login <ChevronDown className={`h-4 w-4 transition-transform ${showLoginOptions ? 'rotate-180' : ''}`} />
              </button>
              {showLoginOptions && (
                <div className="absolute bottom-full left-0 mb-2 w-36 bg-white rounded-lg shadow-xl py-2 z-50">
                  <Link to="/login?type=buyer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Buyer</Link>
                  <Link to="/login?type=seller" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Seller</Link>
                  <Link to="/login?type=agent" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Agent</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Patkar's Realty. All rights reserved. MahaRERA Certified.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer