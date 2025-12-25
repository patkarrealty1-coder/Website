import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const SearchSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState('Residential Buy')
  const [location, setLocation] = useState('')
  const [propertyCategory, setPropertyCategory] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [budget, setBudget] = useState('')

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  // Reset property category when tab changes
  useEffect(() => {
    setPropertyCategory('')
  }, [activeTab])

  const tabs = ['Residential Buy', 'Residential Rent', 'Commercial Buy', 'Commercial Rent', 'For Investors']

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({
      location,
      propertyType: propertyCategory,
      bedrooms,
      budget
    })
    
    if (activeTab === 'For Investors') {
      window.location.href = `/services/investment-advisory?${params.toString()}`
    } else if (activeTab.includes('Residential')) {
      window.location.href = `/residential?${params.toString()}`
    } else {
      window.location.href = `/commercial?${params.toString()}`
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[105rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Container with Image Background */}
        <div 
          className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            backgroundImage: 'url("./images/Section 2.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '900px'
          }}
        >
          {/* Content Container */}
          <div className="relative z-10 p-8 lg:p-16 h-full flex flex-col justify-center min-h-[900px]">
            
            {/* Content positioned like reference */}
            <div className="flex flex-col items-start max-w-5xl space-y-8">
              
              {/* Heading */}
              <div 
                className={`transition-all duration-1000 ease-out delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 leading-tight">
                  Find Nearby Luxurious Estates
                </h1>
                <p className="text-sm lg:text-base text-white/90">
                  We help you find your place, invest and build wealth in Mumbai Thane region.
                </p>
              </div>

              {/* Search Card */}
              <div 
                className={`w-full bg-black/10 backdrop-blur-sm rounded-3xl p-6 lg:p-8 transition-all duration-1000 ease-out delay-400 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Tabs */}
                <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${
                        activeTab === tab
                          ? 'bg-white text-black'
                          : 'bg-black/20 text-white hover:bg-black/30'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Dropdowns Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {/* Location Dropdown */}
                  <div className="relative">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-3 sm:px-5 sm:py-4 bg-white text-black text-sm sm:text-base rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 shadow-lg"
                    >
                      <option value="">Location</option>
                      <option value="oshiwara">Oshiwara</option>
                      <option value="andheri-west">Andheri West</option>
                      <option value="andheri-east">Andheri East</option>
                      <option value="goregaon-west">Goregaon West</option>
                      <option value="goregaon-east">Goregaon East</option>
                      <option value="malad-west">Malad West</option>
                      <option value="malad-east">Malad East</option>
                      <option value="kandivali-west">Kandivali West</option>
                      <option value="kandivali-east">Kandivali East</option>
                      <option value="charkop">Charkop</option>
                      <option value="borivali-west">Borivali West</option>
                      <option value="borivali-east">Borivali East</option>
                      <option value="dahisar-west">Dahisar West</option>
                      <option value="dahisar-east">Dahisar East</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
                  </div>

                  {/* Property Category Dropdown */}
                  <div className="relative">
                    <select
                      value={propertyCategory}
                      onChange={(e) => setPropertyCategory(e.target.value)}
                      className="w-full px-3 py-3 sm:px-5 sm:py-4 bg-white text-black text-sm sm:text-base rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 shadow-lg"
                    >
                      <option value="">Property Type</option>
                      {activeTab === 'For Investors' ? (
                        <>
                          <option value="high-yield-residential">High-Yield Residential</option>
                          <option value="commercial-investment">Commercial Investment</option>
                          <option value="rental-properties">Rental Properties</option>
                          <option value="development-land">Development Land</option>
                          <option value="reit-properties">REIT Properties</option>
                        </>
                      ) : activeTab.includes('Residential') ? (
                        <>
                          <option value="apartment">Apartment</option>
                          <option value="bungalow">Bungalow</option>
                          <option value="cluster-house">Cluster House</option>
                          <option value="penthouse">Penthouse</option>
                          <option value="plot">Plot</option>
                        </>
                      ) : (
                        <>
                          <option value="office">Office</option>
                          <option value="shop">Shop</option>
                          <option value="retail">Retail</option>
                          <option value="warehouse">Warehouse</option>
                          <option value="co-working">Co-working</option>
                        </>
                      )}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
                  </div>

                  {/* Bedrooms Dropdown */}
                  <div className="relative">
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full px-3 py-3 sm:px-5 sm:py-4 bg-white text-black text-sm sm:text-base rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 shadow-lg"
                    >
                      <option value="">Bedroom</option>
                      <option value="1">1 Bedroom</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4">4 Bedrooms</option>
                      <option value="5+">5+ Bedrooms</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
                  </div>
                </div>

                {/* Dropdowns Row 2 - Budget and Search */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {/* Budget Dropdown */}
                  <div className="relative">
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-3 sm:px-5 sm:py-4 bg-white text-black text-sm sm:text-base rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 shadow-lg"
                    >
                      <option value="">Budget</option>
                      <option value="below-50l">Below 50 Lakhs</option>
                      <option value="50l-1cr">50 L - 1 Cr</option>
                      <option value="1cr-1.5cr">1 Cr - 1.5 Cr</option>
                      <option value="1.5cr-2cr">1.5 Cr - 2 Cr</option>
                      <option value="2cr-3cr">2 - 3 Cr</option>
                      <option value="3cr-5cr">3 - 5 Cr</option>
                      <option value="5cr+">5+ Cr</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
                  </div>

                  {/* Search Button */}
                  <button 
                    onClick={handleSearch}
                    className="px-4 py-3 sm:px-8 sm:py-4 bg-white text-black text-sm sm:text-base font-semibold rounded-xl hover:bg-gray-100 transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>🔍</span>
                    Search
                  </button>
                </div>

                {/* Stats Cards */}
                <div 
                  className={`flex gap-2 sm:gap-4 flex-wrap justify-start transition-all duration-1000 ease-out delay-600 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="bg-black/15 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold text-white">120+</div>
                    <div className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1">Properties</div>
                  </div>
                  <div className="bg-black/15 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold text-white">15+</div>
                    <div className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1">Clients</div>
                  </div>
                  <div className="bg-black/15 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold text-white">145+</div>
                    <div className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1">Client Support</div>
                  </div>
                  <div className="bg-black/15 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold text-white">24/7</div>
                    <div className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchSection
