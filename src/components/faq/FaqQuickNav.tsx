import { faqCategories } from '../../data/faq'

export default function FaqQuickNav() {
  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="py-6 border-b border-[#1a1a1a] mb-10 overflow-x-auto">
      <nav className="flex flex-wrap gap-2 container container--narrow" aria-label="FAQ 快速导航">
        {faqCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            className="shrink-0 px-4 py-2 rounded-full border border-[#333] text-sm text-text-secondary hover:text-white hover:border-border-light transition-colors bg-transparent cursor-pointer whitespace-nowrap"
          >
            {cat.title.replace(/^[一二三四五六七八九十]+、/, '')}
          </button>
        ))}
      </nav>
    </div>
  )
}
