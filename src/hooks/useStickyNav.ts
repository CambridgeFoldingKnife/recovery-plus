import { useState, useEffect } from 'react'

export function useStickyNav(threshold = 8) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handler = () => {
      setIsScrolled(window.scrollY > threshold)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return isScrolled
}
