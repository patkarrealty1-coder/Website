import { useState } from 'react'
import { X, CheckCircle, Users, UserPlus, MapPin, ArrowRight } from 'lucide-react'

const AgentPartnership = () => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    cityArea: '',
    experience: '',
    focus: '',
    workingStyle: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Partnership request:', formData)
    setSubmitted(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSubmitted(false)
    setFormData({
      fullName: '',
      mobile: '',
      cityArea: '',
      experience: '',
      focus: '',
      workingStyle: ''
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1️⃣ HERO SECTION */}
      <section className="bg-gray-900 text-white py-24 pt-36">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Partner with Patkar's Realty</h1>
          <p className="text-xl text-gray-300 mb-4">
            A collaborative platform for real estate professionals who value trust, structure, and long-term relationships.
          </p>
          <p className="text-sm text-gray-400 mb-10">
            For independent agents, consultants, and brokerage partners operating in Mumbai.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: '#D4AF37', color: '#111827' }}
          >
            Explore Partnership Opportunities
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* 2️⃣ WHO THIS IS FOR */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Who We Work With</h2>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Independent real estate agents and consultants</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Area specialists with on-ground market knowledge</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Professionals focused on ethical, transparent transactions</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Agents seeking structured collaboration — not just listings exchange</span>
            </li>
          </ul>
          
          <p className="text-gray-600 italic border-l-4 border-blue-500 pl-4">
            We work with a limited set of partners to maintain quality and accountability.
          </p>
        </div>
      </section>

      {/* 3️⃣ COLLABORATION PHILOSOPHY */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Handshake className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Collaboration Philosophy</h2>
          </div>
          
          <p className="text-lg text-gray-700 mb-8">
            At Patkar's Realty, partnerships are built on alignment — not opportunism.
          </p>
          
          <p className="text-gray-700 mb-6">We believe successful collaborations are driven by:</p>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-gray-700">Clear communication</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-gray-700">Mutual respect for clients and processes</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-gray-700">Fair and transparent working terms</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-gray-700">Long-term relationship building</span>
            </li>
          </ul>
          
          <p className="text-gray-600">
            Our approach is structured, selective, and focused on delivering the right outcomes for clients.
          </p>
        </div>
      </section>

      {/* 4️⃣ WHY PARTNER WITH US */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Partner with Patkar's Realty</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700">Access to serious buyer and seller requirements</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700">Structured coordination and follow-ups</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700">Local market depth across key Mumbai micro-markets</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700">Professional handling of documentation and compliance</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 md:col-span-2">
              <p className="text-gray-700">A brand positioned on trust, not volume</p>
            </div>
          </div>
          
          <p className="text-gray-600 italic">
            Details of collaboration are discussed individually, based on fit.
          </p>
        </div>
      </section>

      {/* 5️⃣ GEOGRAPHY & FOCUS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Core Markets</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              Our primary focus areas include <strong>Andheri to Dahisar</strong>.
            </p>
            <p className="text-gray-700">
              We are open to partner in select micro-markets in Mumbai.
            </p>
            <p className="text-gray-600 italic">
              We prefer partners with strong on-ground familiarity in their focus areas.
            </p>
          </div>
        </div>
      </section>

      {/* 6️⃣ HOW PARTNERSHIP BEGINS */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How the Process Works</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="text-gray-700">Share your details and areas of operation</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-gray-700">Our team reviews for alignment</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="text-gray-700">A discussion is scheduled to explore fit</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <p className="text-gray-700">Collaboration is structured on a case-by-case basis</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 italic mt-8 border-l-4 border-gray-300 pl-4">
            We do not operate on open or mass partner models.
          </p>
        </div>
      </section>

      {/* 7️⃣ PARTNER ENQUIRY CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Partnering with Us?</h2>
          <p className="text-gray-300 mb-8">
            If your professional approach aligns with ours, we'd be happy to explore a potential collaboration.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: '#D4AF37', color: '#111827' }}
          >
            Submit Partnership Request
          </button>
        </div>
      </section>

      {/* 9️⃣ FOOTER DISCLAIMER */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500 text-center">
            Patkar's Realty reserves the right to engage with partners based on internal evaluation and alignment with our professional standards.
          </p>
        </div>
      </section>

      {/* 8️⃣ PARTNERSHIP ENQUIRY MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Agent Partnership Enquiry</h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {submitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Request Submitted</h4>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest. Our team will review your request and get back to you if there's alignment.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 91360 97299"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City / Area of Operation *</label>
                  <input
                    type="text"
                    name="cityArea"
                    required
                    value={formData.cityArea}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Andheri West, Borivali"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                  <select
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="2-5">2-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Focus *</label>
                  <select
                    name="focus"
                    required
                    value={formData.focus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select focus area</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your working style</label>
                  <textarea
                    name="workingStyle"
                    value={formData.workingStyle}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of how you work with clients..."
                  />
                </div>

                <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  We review partnership requests selectively. Submitting this form does not guarantee collaboration.
                </p>

                <button
                  type="submit"
                  className="w-full py-4 font-semibold rounded-lg transition-colors"
                  style={{ backgroundColor: '#D4AF37', color: '#111827' }}
                >
                  Submit Partnership Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AgentPartnership
