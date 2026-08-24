import { type ReactNode } from 'react'
import SectionLabel from './SectionLabel'

interface SectionHeaderProps {
  label: string
  title: ReactNode
  subtitle?: string
  centered?: boolean
}

export default function SectionHeader({ label, title, subtitle, centered }: SectionHeaderProps) {
  return (
    <div
      className={`max-w-[720px] mb-12 ${centered ? 'mx-auto text-center' : ''}`}
    >
      <SectionLabel>{label}</SectionLabel>
      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight leading-relaxed">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-lg text-text-secondary leading-relaxed max-w-[600px] whitespace-pre-line ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
