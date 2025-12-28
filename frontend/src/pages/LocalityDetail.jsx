import { useParams, Link } from 'react-router-dom'
import { MapPin, School, Train, TrendingUp, Home, Building } from 'lucide-react'

const LocalityDetail = () => {
  const { slug } = useParams()

  const localityData = {
    'charkop-sector-1': {
      name: 'Charkop Sector 1',
      avgPrice: '₹14,000 - ₹16,000 per sq ft',
      description: 'Charkop Sector 1 is one of the most sought-after residential areas in Kandivali West. With excellent connectivity via metro and road, this locality offers a perfect blend of urban convenience and peaceful living.',
      schools: ['Ryan International School', 'St. Lawrence High School', 'Oberoi International School', 'Thakur Vidya Mandir'],
      connectivity: {
        metro: 'Charkop Metro Station - 5 min walk',
        railway: 'Kandivali Railway Station - 10 min',
        bus: 'Multiple BEST bus routes',
        highway: 'Western Express Highway - 5 min'
      },
      lifestyle: 'Charkop Sector 1 offers a well-planned residential environment with wide roads, ample parking, and green spaces. The area is known for its family-friendly atmosphere, with numerous parks, playgrounds, and community centers. Shopping and dining options are abundant, with local markets and malls within easy reach.',
      amenities: ['Hospitals nearby', 'Shopping malls', 'Parks and gardens', 'Gyms and fitness centers', 'Restaurants and cafes']
    },
    'charkop-sector-2': {
      name: 'Charkop Sector 2',
      avgPrice: '₹13,500 - ₹15,500 per sq ft',
      description: 'Charkop Sector 2 is a prime residential locality known for its modern infrastructure and proximity to essential amenities. The area has seen significant development in recent years.',
      schools: ['Thakur Public School', 'Gokuldham High School', 'Pawar Public School', 'Little Flower High School'],
      connectivity: {
        metro: 'Charkop Metro Station - 8 min walk',
        railway: 'Kandivali Railway Station - 12 min',
        bus: 'Well-connected by BEST buses',
        highway: 'Link Road - 3 min'
      },
      lifestyle: 'A vibrant locality with a mix of residential complexes and local markets. Sector 2 is particularly popular among young families due to its proximity to schools and healthcare facilities.',
      amenities: ['Medical centers', 'Local markets', 'Community halls', 'Sports facilities', 'Banks and ATMs']
    },
    'charkop-sector-3': {
      name: 'Charkop Sector 3',
      avgPrice: '₹13,000 - ₹15,000 per sq ft',
      description: 'Charkop Sector 3 offers a peaceful residential environment with good appreciation potential. The locality is well-connected and features a mix of established and new residential projects.',
      schools: ['Sheth Karamshi Kanji English School', 'Swami Vivekanand International School', 'Dnyan Ganga School'],
      connectivity: {
        metro: 'Charkop Metro Station - 10 min',
        railway: 'Kandivali Railway Station - 15 min',
        bus: 'Regular BEST bus services',
        highway: 'Western Express Highway - 8 min'
      },
      lifestyle: 'Known for its quiet, family-oriented atmosphere. The sector has several parks and open spaces, making it ideal for those seeking a peaceful residential environment.',
      amenities: ['Clinics and pharmacies', 'Grocery stores', 'Parks', 'Religious centers', 'Post office']
    },
    'charkop-sector-8': {
      name: 'Charkop Sector 8',
      avgPrice: '₹12,500 - ₹14,500 per sq ft',
      description: 'Charkop Sector 8 is an emerging locality with several new residential projects. The area offers good investment potential with upcoming infrastructure developments.',
      schools: ['Thakur International School', 'Yashodham High School', 'Bright Start School'],
      connectivity: {
        metro: 'Upcoming metro station nearby',
        railway: 'Kandivali Railway Station - 18 min',
        bus: 'BEST bus connectivity',
        highway: 'Western Express Highway - 10 min'
      },
      lifestyle: 'A developing area with modern residential complexes. Sector 8 attracts young professionals and investors looking for affordable options with growth potential.',
      amenities: ['New shopping complexes', 'Healthcare facilities', 'Upcoming metro', 'Modern societies', 'Parking facilities']
    },
    'kandivali-west': {
      name: 'Kandivali West',
      avgPrice: '₹15,000 - ₹18,000 per sq ft',
      description: 'Kandivali West is a vibrant suburb with excellent connectivity and a thriving commercial ecosystem. The area is home to IT parks, shopping malls, and premium residential complexes.',
      schools: ['Thakur School of Global Education', 'Oberoi International School', 'Ryan International', 'Podar International School'],
      connectivity: {
        metro: 'Kandivali Metro Station - Direct access',
        railway: 'Kandivali Railway Station - 5 min',
        bus: 'Excellent BEST bus network',
        highway: 'Western Express Highway - Direct access'
      },
      lifestyle: 'A bustling locality with a perfect mix of residential and commercial spaces. Kandivali West offers world-class amenities, entertainment options, and dining experiences.',
      amenities: ['Thakur Mall', 'Growel\'s 101 Mall', 'IT parks', 'Multiplexes', 'Premium hospitals']
    },
    'borivali-west': {
      name: 'Borivali West',
      avgPrice: '₹16,000 - ₹20,000 per sq ft',
      description: 'Borivali West is one of Mumbai\'s most premium localities, known for its proximity to Sanjay Gandhi National Park and excellent infrastructure. The area features upscale residential societies and top-notch amenities.',
      schools: ['Arya Vidya Mandir', 'Gokuldham High School', 'Utpal Shanghvi School', 'Rustomjee Cambridge School'],
      connectivity: {
        metro: 'Borivali Metro Station - 10 min',
        railway: 'Borivali Railway Station - 5 min',
        bus: 'Major BEST bus hub',
        highway: 'Western Express Highway - Direct access'
      },
      lifestyle: 'Premium living with access to nature. Borivali West offers a unique combination of urban amenities and green spaces, with the National Park providing a natural retreat.',
      amenities: ['National Park', 'Premium malls', 'Top hospitals', 'Fine dining', 'Luxury societies']
    },
    'borivali-east': {
      name: 'Borivali East',
      avgPrice: '₹13,000 - ₹16,000 per sq ft',
      description: 'Borivali East offers affordable residential options with good connectivity. The area is popular among middle-class families and first-time homebuyers.',
      schools: ['Sheth Nandlal Dhoot School', 'Gokuldham High School', 'Shishuvan School'],
      connectivity: {
        metro: 'Borivali Metro Station - 15 min',
        railway: 'Borivali Railway Station - 8 min',
        bus: 'Well-connected by buses',
        highway: 'Eastern Express Highway - 10 min'
      },
      lifestyle: 'A growing locality with a mix of old and new residential complexes. Borivali East is known for its community feel and affordable housing options.',
      amenities: ['Local markets', 'Healthcare centers', 'Schools', 'Banks', 'Community centers']
    }
  }

  const locality = localityData[slug] || localityData['charkop-sector-1']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-yellow-500" />
            <h1 className="text-4xl md:text-5xl font-bold">{locality.name}</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            {locality.description}
          </p>
        </div>
      </section>

      {/* Average Prices */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Property Price</p>
              <p className="text-3xl font-bold text-gray-900">{locality.avgPrice}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Placeholder */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Location</h2>
          <div className="bg-gray-300 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600">Google Maps integration coming soon</p>
              <p className="text-sm text-gray-500 mt-2">Location: {locality.name}, Mumbai</p>
            </div>
          </div>
        </div>
      </section>

      {/* Living in Locality */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Living in {locality.name}</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">{locality.lifestyle}</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locality.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                <Home className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <School className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Schools Nearby</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {locality.schools.map((school, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-gray-900 font-medium">{school}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connectivity */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Train className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Connectivity</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Metro</h3>
              <p className="text-gray-600">{locality.connectivity.metro}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Railway</h3>
              <p className="text-gray-600">{locality.connectivity.railway}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Bus</h3>
              <p className="text-gray-600">{locality.connectivity.bus}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Highway</h3>
              <p className="text-gray-600">{locality.connectivity.highway}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Available */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Building className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Properties Available</h2>
          </div>
          
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-600 mb-6">
              Explore available properties in {locality.name}
            </p>
            <Link
              to="/listings"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Find Your Home in {locality.name}</h2>
          <p className="text-xl text-gray-200 mb-8">
            Let our experts help you find the perfect property
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LocalityDetail
