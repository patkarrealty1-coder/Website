import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SearchSection from '../components/SearchSection'
import FeaturedLuxuryProperties from '../components/FeaturedLuxuryProperties'
import { Shield, Heart, BookOpen, Users, MapPin, Scale, ArrowRight } from 'lucide-react'

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetchFeaturedProjects()
    fetchBlogs()
  }, [])

  const fetchFeaturedProjects = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/projects')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setFeaturedProjects(data.data.slice(0, 8))
        }
      }
    } catch (error) {
      console.log('Projects API not available')
    }
  }

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/blogs?status=published')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setBlogs(data.data.slice(0, 4))
        }
      }
    } catch (error) {
      console.log('Blogs API not available')
    }
  }

  const featuredProjectsData = [
    { id: 1, name: 'Skyline Towers', location: 'Kandivali West', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400', description: 'Premium 2 & 3 BHK apartments with modern amenities' },
    { id: 2, name: 'Green Valley', location: 'Borivali East', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400', description: 'Eco-friendly residential complex with lush gardens' },
    { id: 3, name: 'Royal Heights', location: 'Charkop', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400', description: 'Luxurious living spaces with panoramic views' },
    { id: 4, name: 'Palm Residency', location: 'Malad West', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', description: 'Contemporary homes in prime location' },
    { id: 5, name: 'Sunrise Apartments', location: 'Goregaon West', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', description: 'Affordable luxury for modern families' },
    { id: 6, name: 'Ocean View', location: 'Dahisar West', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400', description: 'Serene living with excellent connectivity' },
    { id: 7, name: 'Metro Heights', location: 'Andheri West', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400', description: 'Smart homes near metro station' },
    { id: 8, name: 'Garden City', location: 'Kandivali East', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400', description: 'Family-friendly community living' }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Trust Through Action',
      description: 'We earn trust through consistent, ethical behavior—not marketing claims.'
    },
    {
      icon: Heart,
      title: 'Your Investment is Sacred',
      description: 'We understand that buying a home represents decades of savings.'
    },
    {
      icon: BookOpen,
      title: 'Informed Clients, Better Decisions',
      description: 'We believe in education over persuasion.'
    },
    {
      icon: Users,
      title: 'Relationships Over Transactions',
      description: 'We measure success by families who return and refer.'
    },
    {
      icon: MapPin,
      title: 'Deep Local Knowledge',
      description: "We've watched these neighborhoods grow for three decades."
    },
    {
      icon: Scale,
      title: 'Uncompromising Ethics',
      description: "We've built our reputation by saying no to questionable deals."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Search Section */}
      <SearchSection />

      {/* Featured Luxury Properties */}
      <FeaturedLuxuryProperties />

      {/* Our Featured Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full mb-4">
              Our Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our portfolio of premium residential projects across Mumbai's western suburbs</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {(featuredProjects.length > 0 ? featuredProjects : featuredProjectsData).map((project, index) => (
              <div key={project._id || project.id || index} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                  <img 
                    src={project.images?.[0] || project.image || '/images/placeholder-project.jpg'} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <h3 className="text-white font-semibold text-sm md:text-base">{project.name}</h3>
                    <p className="text-gray-200 text-xs md:text-sm flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-xs md:text-sm mt-2 line-clamp-2">{project.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Real Estate Agent Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 text-sm font-medium rounded-full mb-6 border border-blue-500/30">
                ✨ AI-Powered Assistance
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Meet Sara, Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI Real Estate Agent</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Get instant answers to your property questions, personalized recommendations, and expert guidance 24/7. Sara is trained on Mumbai's real estate market to help you make informed decisions.
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-200">Instant property recommendations based on your needs</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-200">Market insights and price analysis</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-200">Available 24/7 to answer your questions</span>
                </div>
              </div>
              
              <Link
                to="/ai-agent"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat with Sara Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            
            {/* Right - Agent Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30 scale-110"></div>
                
                {/* Agent card */}
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
                  <div className="w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden mb-4">
                    <img 
                      src="/images/Saraa.png" 
                      alt="Sara - AI Real Estate Agent"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop'
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-1">Sara</h3>
                    <p className="text-blue-300 font-medium">AI Real Estate Consultant</p>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="text-green-400 text-sm">Online & Ready to Help</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs/Insights Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Explore our latest blogs for real estate insights
              </h2>
            </div>
            <Link
              to="/insights"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Featured Blog - Large */}
              {blogs[0] && (
                <div className="md:col-span-2 md:row-span-2">
                  <Link to={`/blog/${blogs[0]._id}`} className="block group">
                    <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px]">
                      <img 
                        src={blogs[0].image || '/images/placeholder-blog.jpg'} 
                        alt={blogs[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full mb-3">
                          {blogs[0].readTime || '7 min read'}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2">{blogs[0].title}</h3>
                        <p className="text-gray-200 text-sm line-clamp-2">{blogs[0].excerpt}</p>
                        <div className="flex items-center gap-3 mt-4">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {blogs[0].author?.charAt(0) || 'P'}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{blogs[0].author || 'Patkar\'s Realty'}</p>
                            <p className="text-gray-300 text-xs">{blogs[0].authorRole || 'Real Estate Expert'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              
              {/* Other Blogs - Small */}
              {blogs.slice(1, 4).map((blog) => (
                <Link key={blog._id} to={`/blog/${blog._id}`} className="block group">
                  <div className="rounded-2xl overflow-hidden">
                    <img 
                      src={blog.image || '/images/placeholder-blog.jpg'} 
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-4 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Placeholder blogs when no data */}
              <div className="md:col-span-2 md:row-span-2">
                <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px] bg-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800" 
                    alt="High-end properties"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full mb-3">
                      7 min read
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">High-end properties</h3>
                    <p className="text-gray-200 text-sm">Luxury homebuyers and sellers are navigating changing market conditions</p>
                  </div>
                </div>
              </div>
              
              {[
                { title: 'Market trends', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400' },
                { title: 'Housing inventory', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400' },
                { title: 'The right property', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400' }
              ].map((blog, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="rounded-2xl overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-4 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">December 2024</p>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8 md:hidden">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story: Three Decades of Trust</h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>
              In the early 1990s, Charkop was transforming. Mumbai's western suburbs were expanding, and families were ready to invest their life savings in their first homes.
            </p>
            <p>
              Patkar's Realty was founded on a simple principle: <strong>treat every client's investment as if it were your own family's</strong>. No pressure tactics. No hidden agendas. Just honest guidance for life's biggest financial decision.
            </p>
            <p>
              The result? Over 30 years later, most of our business comes from referrals. Families return for their next purchase, then send their children, siblings, and friends. <strong>Three generations trusting one name</strong>—that's not marketing, that's validation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            To protect your lifetime investment with expertise, integrity, and exclusive access—ensuring every family makes decisions they'll be proud of for decades.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Coverage Areas</h2>
          <p className="text-gray-600 mb-8">Serving Mumbai's Western Suburbs with deep local expertise</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Charkop', 'Kandivali', 'Borivali', 'Malad', 'Goregaon', 'Andheri', 'Dahisar', 'Oshiwara'].map((area) => (
              <span key={area} className="px-6 py-3 bg-blue-50 text-blue-700 rounded-full font-medium">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions about our services</p>
          </div>
          <div className="space-y-6">
            {[
              {
                question: "How do I schedule a property viewing?",
                answer: "You can schedule a viewing by calling us at +91 91360 97299, filling out the contact form, or clicking the 'Schedule a Consultation' button."
              },
              {
                question: "What areas do you serve?",
                answer: "We primarily serve Mumbai's western suburbs including Charkop, Kandivali, Borivali, Malad, Goregaon, Andheri, Dahisar, and Oshiwara with deep local expertise."
              },
              {
                question: "Do you charge buyers any commission?",
                answer: "No, we operate on a zero buyer commission model. Our services for buyers are completely free."
              },
              {
                question: "How long have you been in business?",
                answer: "Patkar's Realty has been serving Mumbai families for over 30 years, building trust through three generations of clients."
              },
              {
                question: "Do you help with property financing?",
                answer: "Yes, we provide loan assistance and work with leading banks to help you secure the best home loan rates and terms."
              },
              {
                question: "Are you MahaRERA certified?",
                answer: "Yes, we are MahaRERA certified and compliant, ensuring complete legal safety and transparency in all transactions."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Patkar's Realty Difference?</h2>
          <p className="text-xl text-gray-300 mb-8">Book your free consultation today.</p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 font-semibold rounded-lg transition-colors"
            style={{ backgroundColor: '#D4AF37', color: '#111827' }}
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
