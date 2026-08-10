import { type ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  size?: 'default' | 'sm'
  href?: string
  block?: boolean
  className?: string
  onClick?: () => void
}

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  href,
  block,
  className = '',
  onClick,
}: ButtonProps) {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold text-[0.9375rem] leading-none',
    'border border-transparent cursor-pointer transition-all active:translate-y-px',
    variant === 'primary' ? 'bg-white text-[#0a0a0a] hover:bg-[#e5e5e5]' : '',
    variant === 'ghost' ? 'bg-transparent border-white text-white hover:bg-white/8' : '',
    size === 'sm' ? 'px-[22px] py-[11px] text-sm' : 'px-8 py-[14px]',
    block ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className={baseClasses}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={baseClasses} onClick={onClick}>
      {children}
    </button>
  )
}
