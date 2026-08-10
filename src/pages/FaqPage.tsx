import { faqCategories } from '../data/faq'
import FaqHero from '../components/faq/FaqHero'
import FaqQuickNav from '../components/faq/FaqQuickNav'
import FaqCategory from '../components/faq/FaqCategory'

export default function FaqPage() {
  return (
    <>
      <FaqHero />
      <FaqQuickNav />
      <section className="section section--tight">
        <div className="container container--narrow">
          {faqCategories.map((category) => (
            <FaqCategory key={category.id} category={category} />
          ))}
        </div>
      </section>
    </>
  )
}
