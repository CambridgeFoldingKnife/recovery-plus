import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from '../components/sections/HeroSection'
import ProductInsightSection from '../components/sections/ProductInsightSection'
import TimelineSection from '../components/sections/TimelineSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import ComparisonSection from '../components/sections/ComparisonSection'
import ProductShowcaseSection from '../components/sections/ProductShowcaseSection'
import ScenesSection from '../components/sections/ScenesSection'
import TrustSection from '../components/sections/TrustSection'
import TrainingSection from '../components/sections/TrainingSection'

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
      <ProductInsightSection />
      <TimelineSection />
      <FeaturesSection />
      <ComparisonSection />
      <ProductShowcaseSection />
      <ScenesSection />
      <TrustSection />
      <TrainingSection />
    </>
  )
}
