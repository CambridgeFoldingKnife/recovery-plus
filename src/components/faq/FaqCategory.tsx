import type { FAQCategory as FAQCategoryType } from '../../types'
import FaqAccordion from './FaqAccordion'
import Reveal from '../ui/Reveal'

interface FaqCategoryProps {
  category: FAQCategoryType
}

export default function FaqCategory({ category }: FaqCategoryProps) {
  return (
    <Reveal>
      <div className="mb-10" id={category.id}>
        <h2 className="text-xl font-bold mb-4">{category.title}</h2>
        <div>
          {category.items.map((item, i) => (
            <FaqAccordion key={i} item={item} />
          ))}
        </div>
      </div>
    </Reveal>
  )
}
