import { Link } from 'react-router-dom'
import { MapPin, TrendingUp, Home } from 'lucide-react'

const Localities = () => {
  const localities = [
    {
      slug: 'charkop-sector-1',
      name: 'Charkop Sector 1',
      description: 'Well-established residential area with excellent connectivity and amenities',
      avgPrice: '₹14,000 - ₹16,000 per sq ft',
      highlights: ['Metro connectivity', 'Established societies', 'Good schools nearby']
    },
    {
      slug: 'charkop-sector-2',
      name: 'Charkop Sector 2',
      description: 'Prime residential locality with modern infrastructure',
      avgPrice: '₹13,500 - ₹15,500 per sq ft',
      highlights: ['Close to market', 'Parks and gardens', 'Family-friendly']
    },
    {
      slug: 'charkop-sector-3',
      name: 'Charkop Sector 3',
      description: 'Peaceful residential area with good appreciation potential',
      avgPrice: '₹13,000 - ₹15,000 per sq ft',
      highlights: ['Quiet neighborhood', 'Affordable pricing', 'Growing infrastructure']
    },
    {
      slug: 'charkop-sector-8',
      name: 'Charkop Sector 8',
      description: 'Emerging locality with new developments and projects',
      avgPrice: '₹12,500 - ₹14,500 per sq ft',
      highlights: ['New projects', 'Investment potential', 'Upcoming metro station']
    },
    {
      slug: 'kandivali-west',
      name: 'Kandivali West',
      description: 'Vibrant suburb with excellent connectivity and commercial hubs',
      avgPrice: '₹15,000 - ₹18,000 per sq ft',
      highlights: ['Metro station', 'Shopping malls', 'IT parks nearby']
    },
    {
      slug: 'borivali-west',
      name: 'Borivali West',
      description: 'Premium locality near National Park with great amenities',
      avgPrice: '₹16,000 - ₹20,000 per sq ft',
      highlights: ['National Park proximity', 'Premium societies', 'Excellent schools']
    },
    {
      slug: 'borivali-east',
      name: 'Borivali East',
      description: 'Affordable residential area with good connectivity',
      avgPrice: '₹13,000 - ₹16,000 per sq ft',
      highlights: ['Railway station nearby', 'Affordable options', 'Growing locality']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Mumbai's Western Suburbs</h1>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Discover the best localities with our 30+ years of neighborhood expertise
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We've been serving Mumbai's western suburbs for over three decades. Our deep local knowledge helps you make informed decisions about where to buy, rent, or invest.
          </p>
        </div>
      </section>

      {/* Localities Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localities.map((locality) => (
              <Link
                key={locality.slug}
                to={`/localities/${locality.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-white opacity-80" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {locality.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{locality.description}</p>
                  
                  <div className="flex items-center gap-2 text-green-600 font-semibold mb-4">
                    <TrendingUp className="h-5 w-5" />
                    <span>{locality.avgPrice}</span>
                  </div>

                  <div className="space-y-2">
                    {locality.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Home className="h-4 w-4 text-blue-600" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-blue-600 font-semibold group-hover:underline">
                    Explore {locality.name} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Not Sure Which Locality is Right for You?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Let our experts guide you based on your budget, lifestyle, and preferences
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Get Personalized Recommendations
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Localities
