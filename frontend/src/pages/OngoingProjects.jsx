import { useState, useEffect } from 'react'
import { MapPin, Calendar, Home, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const OngoingProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/projects?status=Ongoing')
      const data = await response.json()
      if (data.success) {
        setProjects(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching ongoing projects:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-gray-300 h-96 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="bg-white shadow-sm mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          
          <div>
            <span className="inline-block bg-orange-600 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Ongoing Projects
            </span>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              All Ongoing Projects
            </h1>
            <p className="text-gray-600 text-lg">
              Explore our complete portfolio of {projects.length} ongoing real estate projects under development
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-t-2xl h-64">
                  <img
                    src={project.image?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm font-medium mb-1">{project.year}</p>
                      <p className="text-lg font-semibold">{project.name}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{project.location?.city}, {project.location?.state}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>

                  <p className="text-gray-600 text-sm line-clamp-3">{project.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      {project.units}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.year}
                    </span>
                  </div>

                  {project.stats && (
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {project.stats.floors && (
                        <div className="text-center p-2 bg-orange-50 rounded-lg">
                          <p className="text-xs text-orange-600">Floors</p>
                          <p className="text-sm font-semibold text-gray-900">{project.stats.floors}</p>
                        </div>
                      )}
                      {project.stats.parking && (
                        <div className="text-center p-2 bg-orange-50 rounded-lg">
                          <p className="text-xs text-orange-600">Parking</p>
                          <p className="text-sm font-semibold text-gray-900">{project.stats.parking}</p>
                        </div>
                      )}
                      {project.stats.amenities && (
                        <div className="text-center p-2 bg-orange-50 rounded-lg">
                          <p className="text-xs text-orange-600">Amenities</p>
                          <p className="text-sm font-semibold text-gray-900">{project.stats.amenities}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <Home className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Ongoing Projects Found</h3>
            <p className="text-gray-600 mb-6">There are no ongoing projects to display at the moment.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default OngoingProjects
