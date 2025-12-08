import { Link } from 'react-router-dom'
import { Linkedin, Youtube, Twitter, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden min-h-[500px] bg-gradient-to-b from-gray-600 to-gray-500">
      {/* Building Image - positioned at bottom right */}
      <div 
        className="absolute bottom-0 right-0 w-[60%] h-[70%]"
        style={{
          backgroundImage: 'url(/images/Untitled%20design%20(3).png)',
          backgroundSize: 'contain',
          backgroundPosition: 'bottom right',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Patkar's Realty</h2>
            <p className="text-white/90 text-sm leading-relaxed">
              Your trusted real estate partner for luxury homes and premium properties.
            </p>
          </div>

          {/* Main Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Main pages</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-white/90 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-white/90 hover:text-white text-sm transition-colors">
                  Listings
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/90 hover:text-white text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/90 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Other Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Other pages</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/listings" className="text-white/90 hover:text-white text-sm transition-colors">
                  Listing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/90 hover:text-white text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white text-sm transition-colors">
                  Agent
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-white/90 hover:text-white text-sm transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-white/90 hover:text-white text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow us</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-white/90 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  Linkedin
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  Youtube
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  X
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white text-sm transition-colors">
                  Tiktok
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/90 text-sm">
              Copyright © All rights reserved · Privacy policy
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

