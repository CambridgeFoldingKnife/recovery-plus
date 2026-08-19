import { type ReactNode, useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}

export default function Reveal({ children, delay = 0, className = '', y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(ref.current, { opacity: 1, y: 0 })
      return
    }
    gsap.fromTo(
      ref.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: delay / 1000,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          once: true,
        },
      },
    )
  }, { scope: ref })

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
