import { type ReactNode, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/gsap'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function Card({ children, className = '', hover = true, glow = false }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !glow) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--glow-x', `${x}px`)
    el.style.setProperty('--glow-y', `${y}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={[
        'bg-bg-card border border-border rounded-xl overflow-hidden transition-all duration-med relative',
        hover ? 'hover:border-border-light hover:-translate-y-0.5' : '',
        glow ? 'gradient-border' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={glow ? {
        // @ts-expect-error CSS custom properties
        '--glow-x': '50%',
        '--glow-y': '50%',
      } : undefined}
    >
      {glow && <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(300px_circle_at_var(--glow-x)_var(--glow-y),rgba(199,242,91,0.06),transparent_70%)]" aria-hidden="true" />}
      {children}
    </div>
  )
}
