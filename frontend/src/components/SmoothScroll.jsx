import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from '@studio-freight/lenis'

const SmoothScroll = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    // Initialize Lenis with smooth settings
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.08,
      wheelMultiplier: 1,
    })

    // Optimized animation frame loop
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return <>{children}</>
}

export default SmoothScroll

