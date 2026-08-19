import { useRef } from 'react'
import { useGSAP, prefersReducedMotion } from '../../lib/gsap'

interface BlurRevealTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  stagger?: number
  delay?: number
}

export default function BlurRevealText({
  text,
  className = '',
  as: Tag = 'h2',
  stagger = 0.02,
  delay = 0,
}: BlurRevealTextProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    const chars = ref.current?.querySelectorAll('.blur-char')
    if (!chars?.length) return

    gsap.fromTo(chars, {
      filter: 'blur(10px)',
      opacity: 0,
      y: 20,
    }, {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      stagger,
      ease: 'power3.out',
      duration: 0.6,
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: ref })

  const chars = text.split('')

  return (
    // @ts-expect-error Tag is a valid HTML tag
    <Tag ref={ref} className={`blur-text ${className}`}>
      {chars.map((char, i) => (
        <span key={i} className="blur-char inline-block" style={prefersReducedMotion() ? { filter: 'none', opacity: 1, transform: 'none' } : undefined}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  )
}
