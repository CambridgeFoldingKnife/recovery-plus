import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`bg-bg-card border border-border rounded-xl overflow-hidden transition-all duration-med ${hover ? 'hover:border-border-light hover:-translate-y-0.5' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
