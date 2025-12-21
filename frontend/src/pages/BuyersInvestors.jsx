import { useState } from 'react'
import { MapPin, Calendar, TrendingUp, CheckCircle } from 'lucide-react'

const BuyersInvestors = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    budgetRange: '',
    preferredLocality: ''
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
      <section className="bg-gray-900 text-white py-20 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Buyer & Investor Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert guidance for your property purchase and investment decisions
          </p>
        </div>
      </section>

      {/* Local Expertise Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Local Expertise</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                30+ years of neighborhood knowledge in Charkop, Kandivali, and Borivali. We don't just know the properties—we know the communities, the growth patterns, and the hidden gems that others miss.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Deep understanding of micro-markets and society reputations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Insights on upcoming infrastructure and development projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Historical price trends and appreciation patterns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Site Visit Planning Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Site Visit Planning</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Coordinated property tours with detailed locality insights. We plan efficient site visits that maximize your time and provide comprehensive information about each property and its surroundings.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Pre-screened properties matching your exact requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Detailed locality walkthroughs covering amenities and connectivity</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Honest assessment of pros and cons for each property</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Negotiation Support Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Negotiation Support</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Builder-exclusive rates and expert negotiation. Our 30-year relationships with builders and developers give you access to better pricing and terms that individual buyers rarely get.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Access to pre-launch and exclusive inventory</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Skilled negotiation to secure the best possible price</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Guidance on payment plans and financing options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Get Personalized Recommendations</h2>
          <p className="text-gray-200 text-center mb-8">Tell us what you're looking for, and we'll find the perfect match</p>
          
          {submitted && (
            <div className="mb-6 p-4 bg-green-500 text-white rounded-lg text-center">
              Thank you! We'll contact you within 24 hours.
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range *</label>
              <select
                name="budgetRange"
                required
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select budget range</option>
                <option value="30-50">₹30-50 Lakhs</option>
                <option value="50-75">₹50-75 Lakhs</option>
                <option value="75-1cr">₹75 Lakhs - 1 Crore</option>
                <option value="1-1.5cr">₹1-1.5 Crore</option>
                <option value="1.5-2cr">₹1.5-2 Crore</option>
                <option value="2cr+">₹2 Crore+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Locality *</label>
              <select
                name="preferredLocality"
                required
                value={formData.preferredLocality}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select locality</option>
                <option value="charkop">Charkop</option>
                <option value="kandivali">Kandivali West</option>
                <option value="borivali-west">Borivali West</option>
                <option value="borivali-east">Borivali East</option>
                <option value="malad">Malad</option>
                <option value="goregaon">Goregaon</option>
                <option value="andheri">Andheri</option>
                <option value="dahisar">Dahisar</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Recommendations
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default BuyersInvestors
