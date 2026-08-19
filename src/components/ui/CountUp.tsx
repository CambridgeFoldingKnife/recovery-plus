import { useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

interface CountUpProps {
  target: number
  suffix?: string
  duration?: number
  className?: string
}

export default function CountUp({ target, suffix = '', duration = 2, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(target === 0 ? '' : '0')

  useGSAP(() => {
    if (prefersReducedMotion() || target === 0) return

    const obj = { val: 0 }

    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        setDisplay(Math.round(obj.val).toString())
      },
    })
  }, { scope: ref })

  return (
    <span ref={ref} className={className}>
      {target === 0 ? '' : display}{suffix}
    </span>
  )
}
