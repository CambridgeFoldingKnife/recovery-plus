import { type ReactNode } from 'react'

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg tracking-[0.2em] uppercase text-text-tertiary font-medium mb-3">
      {children}
    </p>
  )
}
