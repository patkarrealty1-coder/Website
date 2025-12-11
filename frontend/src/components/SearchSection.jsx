import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const SearchSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState('Residential Buy')
  const [location, setLocation] = useState('')
  const [propertyCategory, setPropertyCategory] = useState('')
  const [bedrooms, setBedrooms] = useState('')

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
    // Navigate to appropriate category page with search parameters
    const params = new URLSearchParams({
      location,
      propertyType: propertyCategory,
      bedrooms
    })
    
    if (activeTab === 'For Investors') {
      window.location.href = `/investors?${params.toString()}`
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

              {/* Search Card - Positioned like reference */}
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

                {/* Dropdowns and Search */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {/* Location Dropdown */}
                  <div className="relative">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-3 sm:px-5 sm:py-4 bg-white text-black text-sm sm:text-base rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 shadow-lg"
                      style={{
                        color: 'black',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="" style={{ 
                        color: 'white', 
                        backgroundColor: '#3B82F6',
                        fontWeight: 'bold'
                      }}>Location</option>
                      <option value="thane-west" style={{ 
                        color: 'black', 
                        backgroundColor: 'white'
                      }}>Thane West</option>
                      <option value="thane-east" style={{ 
                        color: 'black', 
                        backgroundColor: 'white'
                      }}>Thane East</option>
                      <option value="mumbra" style={{ 
                        color: 'black', 
                        backgroundColor: 'white'
                      }}>Mumbra</option>
                      <option value="kalwa" style={{ 
                        color: 'black', 
                        backgroundColor: 'white'
                      }}>Kalwa</option>
                      <option value="dombivli" style={{ 
                        color: 'black', 
                        backgroundColor: 'white'
                      }}>Dombivli</option>
                      <option value="kalyan" style={{ 
                        color: 'black', 
                        backgroundColor: 'white'
                      }}>Kalyan</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
                  </div>

                  {/* Property Category Dropdown */}
                  <div className="relative">
                    <select
                      value={propertyCategory}
                      onChange={(e) => setPropertyCategory(e.target.value)}
                      className="w-full px-3 py-3 sm:px-5 sm:py-4 bg-white text-black text-sm sm:text-base rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 shadow-lg"
                      style={{
                        color: 'black',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="" style={{ 
                        color: 'white', 
                        backgroundColor: '#3B82F6',
                        fontWeight: 'bold'
                      }}>Property Type</option>
                      {activeTab === 'For Investors' ? (
                        <>
                          <option value="high-yield-residential" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>High-Yield Residential</option>
                          <option value="commercial-investment" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>Commercial Investment</option>
                          <option value="rental-properties" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>Rental Properties</option>
                          <option value="development-land" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>Development Land</option>
                          <option value="reit-properties" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>REIT Properties</option>
                        </>
                      ) : activeTab.includes('Residential') ? (
                        <>
                          <option value="apartment" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>Apartment</option>
                          <option value="villa" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>Villa</option>
                          <option value="house" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>House</option>
                          <option value="penthouse" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>Penthouse</option>
                          <option value="plot" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>Plot</option>
                        </>
                      ) : (
                        <>
                          <option value="office" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>Office</option>
                          <option value="shop" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>Shop</option>
                          <option value="retail" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>Retail</option>
                          <option value="warehouse" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>Warehouse</option>
                          <option value="co-working" style={{ 
                            color: 'black', 
                            backgroundColor: 'white'
                          }}>Co-working</option>
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
                      style={{
                        color: 'black',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="" style={{ 
                        color: 'white', 
                        backgroundColor: '#3B82F6',
                        fontWeight: 'bold'
                      }}>Bedroom</option>
                      <option value="1" style={{ 
                        color: 'black', 
                        backgroundColor: 'white'
                      }}>1 Bedroom</option>
                      <option value="2" style={{ 
                        color: 'black', 
                        backgroundColor: 'white'
                      }}>2 Bedrooms</option>
                      <option value="3" style={{ 
                        color: 'black', 
                        backgroundColor: 'white'
                      }}>3 Bedrooms</option>
                      <option value="4" style={{ 
                        color: 'black', 
                        backgroundColor: 'white'
                      }}>4 Bedrooms</option>
                      <option value="5+" style={{ 
                        color: 'black', 
                        backgroundColor: 'white'
                      }}>5+ Bedrooms</option>
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



                {/* Stats Cards - At Bottom of Search Card */}
                <div 
                  className={`flex gap-2 sm:gap-4 flex-wrap justify-start transition-all duration-1000 ease-out delay-600 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  {/* Stats Card 1 */}
                  <div className="bg-black/15 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold text-white">500+</div>
                    <div className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1">Properties</div>
                  </div>

                  {/* Stats Card 2 */}
                  <div className="bg-black/15 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold text-white">50+</div>
                    <div className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1">Cities</div>
                  </div>

                  {/* Stats Card 3 */}
                  <div className="bg-black/15 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold text-white">1000+</div>
                    <div className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1">Happy Clients</div>
                  </div>

                  {/* Stats Card 4 */}
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
