import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from '../components/sections/HeroSection'
import TimelineSection from '../components/sections/TimelineSection'
import ProductShowcaseSection from '../components/sections/ProductShowcaseSection'
import ScenesSection from '../components/sections/ScenesSection'

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    // Handle scroll-to-section from Navigation state (cross-page hash navigation)
    const state = location.state as { scrollTo?: string } | null
    if (state?.scrollTo) {
      const timer = setTimeout(() => {
        const el = document.getElementById(state.scrollTo!)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 200)
      // Replace state to prevent re-scroll on back/forward
      window.history.replaceState(null, '')
      return () => clearTimeout(timer)
    }
  }, [location.state])

  return (
    <>
      <HeroSection />
      <TimelineSection />
      <ProductShowcaseSection />
      <ScenesSection />
    </>
  )
}
