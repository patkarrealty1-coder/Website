import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowUp, Mail, Shield, Lock, Scale, FileText, Users, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const TermsConditions = () => {
  const [pageContent, setPageContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    fetchTermsContent()
  }, [])

  const fetchTermsContent = async () => {
    try {
      const response = await fetch(`${API_URL}/page-content/terms-conditions`)
      const data = await response.json()
      if (data.success && data.data) {
        setPageContent(data.data)
      }
    } catch (error) {
      console.error('Error fetching Terms & Conditions content:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)

      const sections = document.querySelectorAll('section[id]')
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const defaultSections = [
    { id: 'nature-service', title: 'Nature of Service', icon: FileText },
    { id: 'accuracy', title: 'Accuracy of Information', icon: AlertCircle },
    { id: 'user-responsibilities', title: 'User Responsibilities', icon: Users },
    { id: 'intellectual-property', title: 'Intellectual Property', icon: Lock },
    { id: 'third-party', title: 'Third-Party Content', icon: Shield },
    { id: 'communication', title: 'Communication Consent', icon: Mail },
    { id: 'disclaimer', title: 'Disclaimer', icon: XCircle },
    { id: 'contact', title: 'Contact', icon: Mail }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 pt-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Terms & Conditions</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Scale className="w-4 h-4" />
              <span className="text-sm font-medium">Legal Agreement</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {pageContent?.title || 'Terms & Conditions'}
            </h1>
            
            <p className="text-lg text-gray-300 mb-4">
              Please read these Terms and Conditions carefully before using PatkarRealtyMumbai services.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Last Updated:</span>
              <span className="font-semibold text-white">February 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticky Table of Contents - Desktop */}
          <aside className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Sections</h3>
                <nav className="space-y-2">
                  {defaultSections.map((section) => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                          activeSection === section.id
                            ? 'bg-gray-900 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="flex-1 max-w-4xl">
            {/* Dynamic Sections from Admin Panel */}
            {pageContent?.sections?.map((section, index) => (
              <section key={index} id={`section-${index}`} className="mb-16 scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                      <Scale className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{section.heading}</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-600">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4 whitespace-pre-line">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </section>
            ))}

            {/* Fallback: Default Content if no admin content */}
            {(!pageContent?.sections || pageContent.sections.length === 0) && (
              <>
                {/* Nature of Service */}
                <section id="nature-service" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">1. Nature of Service</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">PatkarRealtyMumbai provides:</p>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Real estate consultancy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Market information</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Educational content</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Property suggestions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Project walk-throughs</span>
                        </li>
                      </ul>
                      
                      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mt-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <p className="text-amber-800 text-sm font-semibold">
                            This content is informational only and not legal or financial advice.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Accuracy of Information */}
                <section id="accuracy" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">2. Accuracy of Information</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">We try to provide accurate updates, but:</p>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Prices and availability may change</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Travel times are estimates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Redevelopment timelines vary</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Users should verify all project details independently</span>
                        </li>
                      </ul>

                      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mt-6">
                        <div className="flex items-start gap-3">
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <p className="text-red-800 text-sm font-semibold">
                            We are not liable for any decisions made based solely on social media content.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* User Responsibilities */}
                <section id="user-responsibilities" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">3. User Responsibilities</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">By interacting with our pages, you agree:</p>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Not to misuse the platform</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Not to post abusive or misleading content</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>To provide accurate information when enquiring</span>
                        </li>
                      </ul>

                      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mt-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <p className="text-amber-800 text-sm">
                            We may restrict access or block users in case of misuse.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Intellectual Property */}
                <section id="intellectual-property" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">4. Intellectual Property</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">All content including:</p>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Videos & reels</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Photos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Market analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Brochures & reports</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Branding (PatkarRealtyMumbai)</span>
                        </li>
                      </ul>

                      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mt-6">
                        <div className="flex items-start gap-3">
                          <Lock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <p className="text-red-800 text-sm font-semibold">
                            is owned by us and cannot be copied or redistributed without permission.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Third-Party Content */}
                <section id="third-party" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">5. Third-Party Content</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">We may feature:</p>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Developer images</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Market data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Real estate news</span>
                        </li>
                      </ul>

                      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mt-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <p className="text-blue-800 text-sm">
                            PatkarRealtyMumbai is not responsible for external inaccuracies.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Communication Consent */}
                <section id="communication" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">6. Communication Consent</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">
                        By sending a DM, WhatsApp message, form submission, or interacting with ads, you agree to receive:
                      </p>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Property details</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Brochures</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Price updates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Follow-up communication</span>
                        </li>
                      </ul>

                      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mt-6">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-green-800 text-sm">
                            You may opt out anytime.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Disclaimer */}
                <section id="disclaimer" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <XCircle className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">7. Disclaimer</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">
                        PatkarRealtyMumbai is a real estate consultant/channel partner.
                      </p>
                      <p className="mb-4">
                        Actual sale agreements occur between buyer ↔ seller/developer.
                      </p>
                      
                      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mt-6">
                        <div className="flex items-start gap-3">
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-red-900 mb-2">We are not responsible for:</h4>
                            <ul className="text-red-800 text-sm space-y-1">
                              <li>• Delays in possession</li>
                              <li>• Builder disputes</li>
                              <li>• Price changes</li>
                              <li>• Developer policies</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="mt-6 text-sm font-semibold">
                        Please evaluate independently before booking.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Contact */}
                <section id="contact" className="mb-16 scroll-mt-24">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-8 text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-gray-900" />
                      </div>
                      <h2 className="text-3xl font-bold">8. Contact</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                        <h4 className="font-semibold mb-3 text-white">Email</h4>
                        <a href="mailto:support@patkarrealty.in" className="text-white hover:text-gray-300 transition-colors text-lg">
                          📩 support@patkarrealty.in
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* Footer Note */}
            <div className="bg-gray-100 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600">
                These Terms & Conditions are effective as of February 2025. PatkarRealtyMumbai provides real estate consultancy, market information, educational content, property suggestions, and project walk-throughs.
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export default TermsConditions
