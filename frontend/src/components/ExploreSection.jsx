import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

const ExploreSection = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Rent')
  const [location, setLocation] = useState('')
  const [propertyCategory, setPropertyCategory] = useState('')
  const [bedrooms, setBedrooms] = useState('')

  const tabs = ['Rent', 'Sale', 'Commercial', 'Land', 'Lease']

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({
      type: activeTab.toLowerCase(),
      ...(location && { location }),
      ...(propertyCategory && { category: propertyCategory }),
      ...(bedrooms && { bedrooms })
    })
    navigate(`/listings?${params.toString()}`)
  }

  return (
    <section className="bg-white py-20 px-2 sm:px-4">
      <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto">
        {/* Image Container */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9', minHeight: '700px' }}>
          {/* Background Image */}
          <img
            src="/images/Section 2.png"
            alt="Luxurious Estate Interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

          {/* Content - LEFT ALIGNED */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16">
            {/* Top Section - Heading and Search */}
            <div className="max-w-2xl">
              {/* Heading - Top Left */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                  Find Nearby Luxurious Estates
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-white/90">
                  We help you find your place, invest and build wealth in United Kingdom.
                </p>
              </div>

              {/* Search Card - Compact */}
              <div className="bg-black/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-5">
                {/* Tabs */}
                <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm whitespace-nowrap ${
                        activeTab === tab
                          ? 'bg-white/20 text-white'
                          : 'bg-transparent text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Search Form - Single Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-3 mb-2 sm:mb-3">
                  {/* Location */}
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-black/60 text-white text-xs sm:text-sm appearance-none cursor-pointer focus:outline-none border border-white/10"
                  >
                    <option value="" className="text-gray-900">Location</option>
                    <option value="mumbai" className="text-gray-900">Mumbai</option>
                    <option value="pune" className="text-gray-900">Pune</option>
                    <option value="delhi" className="text-gray-900">Delhi</option>
                  </select>

                  {/* Property Category */}
                  <select
                    value={propertyCategory}
                    onChange={(e) => setPropertyCategory(e.target.value)}
                    className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-black/60 text-white text-xs sm:text-sm appearance-none cursor-pointer focus:outline-none border border-white/10"
                  >
                    <option value="" className="text-gray-900">Property Category</option>
                    <option value="apartment" className="text-gray-900">Apartment</option>
                    <option value="villa" className="text-gray-900">Villa</option>
                    <option value="house" className="text-gray-900">House</option>
                  </select>

                  {/* Bedrooms */}
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-black/60 text-white text-xs sm:text-sm appearance-none cursor-pointer focus:outline-none border border-white/10"
                  >
                    <option value="" className="text-gray-900">Bedrooms</option>
                    <option value="1" className="text-gray-900">1 Bedroom</option>
                    <option value="2" className="text-gray-900">2 Bedrooms</option>
                    <option value="3" className="text-gray-900">3 Bedrooms</option>
                    <option value="4+" className="text-gray-900">4+ Bedrooms</option>
                  </select>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 sm:px-6 sm:py-2.5 bg-white text-gray-900 rounded-lg font-semibold text-xs sm:text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
                  >
                    <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Search
                  </button>
                </div>

                {/* Explore Link */}
                <button
                  onClick={() => navigate('/listings')}
                  className="text-cyan-400 hover:text-cyan-300 text-xs sm:text-sm font-medium"
                >
                  + Explore by Cities
                </button>
              </div>
            </div>

            {/* Stats - Bottom Left */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 max-w-3xl">
              {[
                { number: '500+', label: 'Properties' },
                { number: '50+', label: 'Cities' },
                { number: '1000+', label: 'Happy Clients' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-2.5 sm:p-4 bg-black/40 backdrop-blur-md rounded-lg sm:rounded-xl border border-white/10"
                >
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-[10px] sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExploreSection

