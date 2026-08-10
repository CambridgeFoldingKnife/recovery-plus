import { useState, type MouseEvent } from 'react'
import type { FAQItem } from '../../types'
import { ChevronDownIcon } from '../ui/Icons'

interface FaqAccordionProps {
  item: FAQItem
}

export default function FaqAccordion({ item }: FaqAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="border-b border-[#1a1a1a]">
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center justify-between gap-4 py-4 cursor-pointer text-text-secondary hover:text-white transition-colors bg-transparent border-none text-left"
      >
        <span className="text-sm font-medium pr-8">{item.question}</span>
        <span className={`shrink-0 transition-transform duration-200 text-text-tertiary ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon size={20} />
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-text-secondary leading-relaxed animate-[faq-in_0.3s_var(--ease-out)]">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  )
}
