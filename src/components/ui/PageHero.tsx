import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface PageHeroProps {
  label?: string
  title: ReactNode
  subtitle?: string
}

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="pt-12 pb-8 text-center">
      <div className="container container--narrow">
        {label && (
          <Reveal>
            <p className="text-lg tracking-[0.2em] uppercase text-text-tertiary font-medium mb-4">{label}</p>
          </Reveal>
        )}
        <Reveal delay={100}>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={200}>
            <p className="text-text-secondary leading-relaxed">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
