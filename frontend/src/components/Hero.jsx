import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const AnimatedText = () => {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  
  const texts = [
    "What If Expert\nGuidance Cost You\nNothing?",
    "Why Navigate Alone\nWhen Expertise Is Free?",
    "Your Dream Home\nAwaits Discovery"
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentPhase(prev => (prev + 1) % texts.length)
        setIsVisible(true)
      }, 500)
      
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Invisible rectangular boundary container */}
      <div className="w-full max-w-4xl mx-auto px-4" style={{ maxWidth: '950px' }}>
        <div className="text-center whitespace-pre-line leading-tight">
          <span 
            className={`inline-block transition-all duration-500 ease-in-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              fontFamily: "'Inter', 'Poppins', sans-serif",
              minHeight: '180px', // Fixed height to prevent layout shift
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '100%', // Ensures text stays within boundary
              textAlign: 'center'
            }}
          >
            {texts[currentPhase]}
          </span>
        </div>
      </div>
    </div>
  )
}

const Hero = ({ onExploreClick }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollClick = () => {
    if (onExploreClick) {
      onExploreClick()
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/Firefly.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content Container - Fixed Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="flex flex-col items-center justify-center min-h-screen text-center py-20"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px)`,
            fontFamily: "'Inter', 'Poppins', 'DM Sans', sans-serif"
          }}
        >
          {/* Headline Container - Fixed Boundary */}
          <div className="w-full max-w-4xl mx-auto mb-8">
            <h1 
              className={`font-bold text-white text-center leading-[1.15] transition-all duration-700 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
                letterSpacing: '-0.025em'
              }}
            >
              <AnimatedText />
            </h1>
          </div>
          
          {/* Subline Container - Fixed Position */}
          <div className="w-full max-w-2xl mx-auto mb-12">
            <p 
              className={`text-white/75 text-sm sm:text-base text-center px-4 transition-all duration-700 ease-out delay-150 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                lineHeight: '1.6',
                fontWeight: '300',
                minHeight: '48px' // Fixed height to prevent shift
              }}
            >
              Your trusted real estate agency for luxury homes, offering personalized service and exquisite properties.
            </p>
          </div>
          
          {/* Buttons Container - Fixed Position and Size */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
              <Link
                to="/contact"
                className={`inline-flex items-center justify-center bg-transparent border-2 border-white/90 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-white/10 hover:border-white hover:shadow-white/20 transition-colors duration-300 shadow-lg backdrop-blur-sm ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: '300ms',
                  width: '100%',
                  maxWidth: '280px',
                  height: '56px',
                  minHeight: '56px'
                }}
              >
                Book a Free Consultation
              </Link>
              
              <button
                onClick={onExploreClick}
                className={`inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/90 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-white/10 hover:border-white hover:shadow-white/20 transition-colors duration-300 shadow-lg backdrop-blur-sm ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: '400ms',
                  width: '100%',
                  maxWidth: '280px',
                  height: '56px',
                  minHeight: '56px'
                }}
              >
                <span>Explore Properties</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Particles - Optimized and Hidden when scrolling */}
      {scrollY < 50 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-30"
              style={{
                width: '2px',
                height: '2px',
                left: `${Math.random() * 100}%`,
                bottom: '-10px',
                backgroundColor: '#fbbf24',
                boxShadow: '0 0 3px #fbbf24',
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
                animation: 'floatUp linear infinite',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            />
          ))}
        </div>
      )}

      {/* Gradient at Top for Blending with Navbar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 via-black/10 to-transparent pointer-events-none z-20"></div>

      {/* Scroll Indicator with Pulse Animation */}
      {onExploreClick && scrollY < 100 && (
        <button
          onClick={handleScrollClick}
          className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-800 z-30 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          aria-label="Scroll to properties"
        >
          <div className="flex flex-col items-center gap-2 text-white hover:text-amber-400 transition-colors cursor-pointer">
            <span className="text-sm font-medium drop-shadow-lg" style={{ fontFamily: "'Inter', sans-serif" }}>Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center animate-bounce hover:border-amber-400 transition-colors">
              <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </button>
      )}
    </section>
  )
}

export default Hero
