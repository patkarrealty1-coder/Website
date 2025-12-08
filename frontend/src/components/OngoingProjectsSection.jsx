import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Home } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const OngoingProjectsSection = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [headerRef, isHeaderVisible] = useScrollAnimation({ threshold: 0.2, once: true })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/projects?status=Ongoing')
      const data = await response.json()
      if (data.success && data.data && data.data.length > 0) {
        setProjects(data.data)
      } else {
        // Demo data for testing - remove after seeding real data
        setProjects([
          {
            _id: '1',
            name: 'Phoenix Heights',
            description: 'Modern high-rise residential tower currently under construction, featuring state-of-the-art amenities and panoramic city views.',
            location: { address: '234 Worli Sea Face', city: 'Mumbai', state: 'Maharashtra' },
            year: '2025',
            units: '180 Units',
            status: 'Ongoing',
            image: { url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80' }
          },
          {
            _id: '2',
            name: 'Emerald Gardens Phase 2',
            description: 'Expansion of our successful Emerald Gardens project, bringing more eco-friendly living spaces with enhanced green features.',
            location: { address: '567 Goregaon West', city: 'Mumbai', state: 'Maharashtra' },
            year: '2025',
            units: '120 Units',
            status: 'Ongoing',
            image: { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' }
          },
          {
            _id: '3',
            name: 'Marina Bay Residences',
            description: 'Luxury waterfront apartments with direct marina access, currently in advanced stages of construction.',
            location: { address: '890 Bandra Reclamation', city: 'Mumbai', state: 'Maharashtra' },
            year: '2025',
            units: '95 Units',
            status: 'Ongoing',
            image: { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' }
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching ongoing projects:', error)
      // Show demo data on error
      setProjects([
        {
          _id: '1',
          name: 'Phoenix Heights',
          description: 'Modern high-rise residential tower currently under construction, featuring state-of-the-art amenities and panoramic city views.',
          location: { address: '234 Worli Sea Face', city: 'Mumbai', state: 'Maharashtra' },
          year: '2025',
          units: '180 Units',
          status: 'Ongoing',
          image: { url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80' }
        },
        {
          _id: '2',
          name: 'Emerald Gardens Phase 2',
          description: 'Expansion of our successful Emerald Gardens project, bringing more eco-friendly living spaces with enhanced green features.',
          location: { address: '567 Goregaon West', city: 'Mumbai', state: 'Maharashtra' },
          year: '2025',
          units: '120 Units',
          status: 'Ongoing',
          image: { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' }
        },
        {
          _id: '3',
          name: 'Marina Bay Residences',
          description: 'Luxury waterfront apartments with direct marina access, currently in advanced stages of construction.',
          location: { address: '890 Bandra Reclamation', city: 'Mumbai', state: 'Maharashtra' },
          year: '2025',
          units: '95 Units',
          status: 'Ongoing',
          image: { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-300 h-96 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Don't render section if no ongoing projects
  if (projects.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`scroll-fade-in ${isHeaderVisible ? 'visible' : ''} mb-16`}
        >
          <span className="inline-block bg-black text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Ongoing Projects
          </span>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Ongoing Projects
          </h2>
          <p className="text-gray-600">
            Explore our current projects under development
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project, index) => (
            <div
              key={project._id}
              className={`group scroll-fade-in scroll-stagger-${index + 1} ${isHeaderVisible ? 'visible' : ''}`}
            >
              <div className="relative overflow-hidden rounded-2xl h-80 mb-4">
                <img
                  src={project.image?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm font-medium mb-2">{project.status}</p>
                    <p className="text-lg font-semibold">{project.name}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{project.location?.city}, {project.location?.state}</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>

                <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
                  <span className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    {project.units}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/ongoing-projects"
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-medium flex items-center gap-2"
          >
            Explore All Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default OngoingProjectsSection
