import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowUp, Mail, Shield, Lock, Eye, FileText, Users, AlertCircle } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const PrivacyPolicy = () => {
  const [pageContent, setPageContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    fetchPrivacyContent()
  }, [])

  const fetchPrivacyContent = async () => {
    try {
      const response = await fetch(`${API_URL}/page-content/privacy-policy`)
      const data = await response.json()
      if (data.success && data.data) {
        setPageContent(data.data)
      }
    } catch (error) {
      console.error('Error fetching Privacy Policy content:', error)
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

  // Default sections for table of contents
  const defaultSections = [
    { id: 'information-collection', title: 'Information We Collect', icon: Eye },
    { id: 'how-we-use', title: 'How We Use Your Information', icon: Users },
    { id: 'data-sharing', title: 'Sharing of Information', icon: Shield },
    { id: 'data-security', title: 'Data Security', icon: Lock },
    { id: 'your-rights', title: 'Your Rights', icon: AlertCircle },
    { id: 'third-party', title: 'Third-Party Links', icon: FileText },
    { id: 'updates', title: 'Updates to the Policy', icon: AlertCircle }
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
            <span className="text-white">Privacy Policy</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Your Privacy Matters</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {pageContent?.title || 'Privacy Policy'}
            </h1>
            
            <p className="text-lg text-gray-300 mb-4">
              PatkarRealtyMumbai operates Instagram, Facebook, YouTube and other digital platforms to share real estate information and connect with homebuyers.
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
                <h3 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h3>
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
                      <Shield className="w-6 h-6 text-white" />
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
                {/* Information Collection */}
                <section id="information-collection" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">1. Information We Collect</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Voluntarily Provided by You</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span>Name</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span>Mobile number</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span>Email address</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span>Budget, location and property requirements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span>Messages sent via WhatsApp, DMs, comments, or forms</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span>Uploaded files (floor plans, documents, etc.)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span>Analytics data from Instagram/Facebook/YouTube</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span>Engagement metrics (likes, comments, shares)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span>Ad interaction data</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span>Device type, region, approximate location</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <p className="text-blue-800 text-sm">
                            We do not collect sensitive financial or biometric data.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* How We Use Information */}
                <section id="how-we-use" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">2. How We Use Your Information</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">We use the collected information to:</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Respond to your enquiries</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Provide property options and consultation</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Share brochures, trends, price sheets, or project updates</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Arrange site visits</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Share relevant information via WhatsApp, SMS, or email</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Improve ads, content, and user experience</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Create custom audiences for digital advertising</span>
                        </div>
                      </div>

                      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mt-6">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-green-800 text-sm font-semibold">
                            We never sell your personal information.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Data Sharing */}
                <section id="data-sharing" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">3. Sharing of Information</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">Your data may be shared only when required, such as:</p>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>With developers/channel partners to check availability or arrange visits</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>With WhatsApp Business, Meta, Google for communication and advertising</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>When requested by law enforcement</span>
                        </li>
                      </ul>

                      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mt-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <p className="text-amber-800 text-sm font-semibold">
                            We do not share your data for unrelated marketing purposes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Data Security */}
                <section id="data-security" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">4. Data Security</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">We take reasonable steps to protect your information by:</p>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Securely storing contact data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Limiting access to authorized personnel</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Using official communication tools (WhatsApp Business, Meta APIs)</span>
                        </li>
                      </ul>

                      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mt-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <p className="text-blue-800 text-sm">
                            However, data shared on social media is also governed by the platform's own privacy policy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Your Rights */}
                <section id="your-rights" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">5. Your Rights</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">You may:</p>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Request deletion of your data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Request a copy of stored information</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Opt out of WhatsApp or SMS updates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Unsubscribe from future marketing</span>
                        </li>
                      </ul>

                      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mt-6">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-amber-900 mb-2">Send requests to:</h4>
                            <p className="text-amber-800 text-sm">
                              📩 <a href="mailto:support@patkarrealty.in" className="font-semibold underline">
                                support@patkarrealty.in
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Third-Party Links */}
                <section id="third-party" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">6. Third-Party Links</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">Our pages may link to:</p>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Developer project websites</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Registration links</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Google Drive / PDFs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>Landing pages</span>
                        </li>
                      </ul>

                      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mt-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <p className="text-amber-800 text-sm">
                            We are not responsible for external privacy practices.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Updates to Policy */}
                <section id="updates" className="mb-16 scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">7. Updates to the Policy</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">
                        We may update this policy at any time. The updated version will be posted publicly.
                      </p>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* Footer Note */}
            <div className="bg-gray-100 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600">
                This Privacy Policy is effective as of February 2025. PatkarRealtyMumbai ("we", "us", "our") operates Instagram, Facebook, YouTube and other digital platforms to share real estate information and connect with homebuyers.
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

export default PrivacyPolicy
