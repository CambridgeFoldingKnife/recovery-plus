import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.fromTo(ref.current, { scaleX: 0 }, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
  }, { scope: ref })

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-white to-accent origin-left z-[60]"
      aria-hidden="true"
    />
  )
}
