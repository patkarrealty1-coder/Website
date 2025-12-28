import { useState } from 'react'
import { Shield, Megaphone, Camera, Sparkles, CheckCircle } from 'lucide-react'

const Sellers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyType: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Seller Services</h1>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Get the best value for your property with our proven marketing strategies
          </p>
        </div>
      </section>

      {/* Why List With Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why List With Patkar's Realty</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                MahaRERA certified | 30+ years trusted network | Zero compromise on transparency
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Access to our extensive database of verified, serious buyers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Accurate property valuation based on current market trends</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Complete legal documentation support and verification</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Faster closures with our pre-qualified buyer network</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Plan */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Megaphone className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Marketing Plan</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Multi-channel property promotion to qualified buyers
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Featured listings on major property portals (99acres, MagicBricks, Housing.com)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Targeted social media campaigns to reach serious buyers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Direct outreach to our network of investors and end-users</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Regular updates and feedback on buyer interest</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Photography */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Camera className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Photography</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                High-quality visuals that showcase your property's best features
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Professional photography highlighting key selling points</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Virtual tours and video walkthroughs for remote buyers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Drone photography for larger properties and unique views</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Staging */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Property Staging</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Expert advice to maximize your property's appeal
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Pre-listing consultation on minor improvements that add value</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Decluttering and presentation tips for site visits</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Guidance on highlighting unique features and amenities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Book a Free Property Valuation</h2>
          <p className="text-gray-200 text-center mb-8">Get an accurate market valuation of your property</p>
          
          {submitted && (
            <div className="mb-6 p-4 bg-green-500 text-white rounded-lg text-center">
              Thank you! We'll contact you within 24 hours to schedule your valuation.
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+91 91360 97299"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Address *</label>
              <textarea
                name="propertyAddress"
                required
                value={formData.propertyAddress}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full property address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
              <select
                name="propertyType"
                required
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select property type</option>
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
                <option value="4bhk">4+ BHK</option>
                <option value="commercial">Commercial</option>
                <option value="plot">Plot/Land</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Request Free Valuation
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Sellers
