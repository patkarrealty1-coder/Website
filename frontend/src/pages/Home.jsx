import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SearchSection from '../components/SearchSection'
import FeaturedLuxuryProperties from '../components/FeaturedLuxuryProperties'
import { Shield, Heart, BookOpen, Users, MapPin, Scale, Lightbulb, MessageSquare, Award, Building, Calendar, ArrowRight } from 'lucide-react'

const Home = () => {
  const searchRef = useRef(null)
  const propertiesRef = useRef(null)
  const [completedProjects, setCompletedProjects] = useState([])
  const [ongoingProjects, setOngoingProjects] = useState([])
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetchProjects()
    fetchBlogs()
  }, [])

  const fetchProjects = async () => {
    try {
      // Fetch completed projects
      const completedRes = await fetch('http://localhost:4000/api/projects?status=completed')
      if (completedRes.ok) {
        const completedData = await completedRes.json()
        if (completedData.success && completedData.data) {
          setCompletedProjects(completedData.data.slice(0, 3))
        }
      }
      
      // Fetch ongoing projects
      const ongoingRes = await fetch('http://localhost:4000/api/ongoing-projects')
      if (ongoingRes.ok) {
        const ongoingData = await ongoingRes.json()
        if (ongoingData.success && ongoingData.data) {
          setOngoingProjects(ongoingData.data.slice(0, 3))
        }
      }
    } catch (error) {
      // Silently fail - will show placeholder content
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
      // Silently fail - will show placeholder content
      console.log('Blogs API not available')
    }
  }

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  const features = [
    {
      icon: Lightbulb,
      title: 'Expert market knowledge',
      description: 'A real estate company with strong market expertise can offer valuable insights.'
    },
    {
      icon: MessageSquare,
      title: 'Strong communication',
      description: 'Clear and timely communication throughout the buying or selling process.'
    },
    {
      icon: Award,
      title: 'Professionalism',
      description: 'Maintaining high standards of professionalism in all interactions and transactions.'
    }
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
      <Hero onExploreClick={scrollToSearch} />

      {/* Search Section */}
      <div ref={searchRef}>
        <SearchSection />
      </div>

      {/* Featured Luxury Properties */}
      <div ref={propertiesRef}>
        <FeaturedLuxuryProperties />
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full mb-4">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Discover our features</h2>
              <p className="text-gray-600 mb-8">Features built to simplify your journey.</p>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/images/feature-home.jpg" 
                alt="Modern luxury interior"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Completed Projects Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full mb-4">
            Completed Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Completed Projects</h2>
          <p className="text-gray-600 mb-10">Explore our portfolio of successfully completed real estate projects</p>
          
          {completedProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {completedProjects.map((project) => (
                <div key={project._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src={project.images?.[0] || '/images/placeholder-project.jpg'} 
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location || 'Mumbai, Maharashtra'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {project.units || '0'} Units
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {project.completionYear || '2024'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No completed projects found</p>
          )}
        </div>
      </section>

      {/* Ongoing Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full mb-4">
            Ongoing Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Ongoing Projects</h2>
          <p className="text-gray-600 mb-10">Explore our current projects under development</p>
          
          {ongoingProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ongoingProjects.map((project) => (
                <div key={project._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src={project.images?.[0] || '/images/placeholder-project.jpg'} 
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location || 'Mumbai, Maharashtra'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {project.units || '0'} Units
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {project.expectedCompletion || '2025'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No ongoing projects found</p>
          )}
          
          <div className="text-center mt-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Explore All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
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
