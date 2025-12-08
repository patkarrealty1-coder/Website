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
      <div className="w-full flex items-center justify-center">
        <div className="text-center whitespace-pre-line leading-tight mx-auto">
          <span 
            className={`inline-block transition-all duration-500 ease-in-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
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
      
      {/* Content */}
      <div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-screen"
        style={{ 
          transform: `translateY(${scrollY * 0.3}px)`,
          fontFamily: "'Inter', 'Poppins', 'DM Sans', sans-serif"
        }}
      >
        {/* Headline */}
        <h1 
          className={`font-bold text-white text-center leading-[1.15] mb-5 sm:mb-6 md:mb-7 transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 4rem)',
            letterSpacing: '-0.025em',
            maxWidth: '90%',
            margin: '0 auto'
          }}
        >
          <AnimatedText />
        </h1>
        
        {/* Subline */}
        <p 
          className={`text-white/75 text-xs sm:text-sm text-center mb-10 sm:mb-12 md:mb-14 max-w-lg mx-auto px-2 transition-all duration-700 ease-out delay-150 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            lineHeight: '1.6',
            fontWeight: '300'
          }}
        >
          Your trusted real estate agency for luxury homes, offering personalized service and exquisite properties.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 max-w-2xl mx-auto w-full">
          <Link
            to="/contact"
            className={`inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/90 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-white/10 hover:border-white hover:shadow-white/20 transition-all duration-400 shadow-lg hover:shadow-xl hover:scale-[1.02] w-full sm:w-auto sm:min-w-[200px] backdrop-blur-sm delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Book a Free Consultation
          </Link>
          
          <button
            onClick={onExploreClick}
            className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/90 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-white/10 hover:border-white hover:shadow-white/20 transition-all duration-400 shadow-lg hover:shadow-xl hover:scale-[1.02] w-full sm:w-auto sm:min-w-[200px] backdrop-blur-sm delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span>Explore Properties</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Animated Particles - Hidden when scrolling */}
      {scrollY < 50 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-50"
              style={{
                width: '1px',
                height: '1px',
                left: `${Math.random() * 100}%`,
                bottom: '-10px',
                backgroundColor: '#fbbf24',
                boxShadow: '0 0 4px #fbbf24, 0 0 8px #fbbf24',
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${7.5 + Math.random() * 5}s`,
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
