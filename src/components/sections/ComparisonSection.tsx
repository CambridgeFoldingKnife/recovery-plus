import { comparisonCards } from '../../data/comparison'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { CheckIcon, CrossIcon } from '../ui/Icons'

export default function ComparisonSection() {
  return (
    <section className="section" id="compare">
      <div className="container">
        <SectionHeader
          label="产品对比"
          title={<>市场上不缺「按摩」产品，<br />缺的是真正理解运动恢复原理。</>}
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisonCards.map((card, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                className={`rounded-xl border p-6 h-full transition-all duration-med ${
                  card.isHighlighted
                    ? 'border-accent/30 bg-accent/[0.03]'
                    : 'border-border bg-bg-card'
                }`}
              >
                <div className="mb-5">
                  <h3 className="text-lg font-bold mb-1">{card.title}</h3>
                  <p className="text-base text-text-tertiary">{card.subtitle}</p>
                </div>

                <ul className="flex flex-col gap-3">
                  {card.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-base">
                      <span className={feature.isPositive ? 'text-success' : 'text-text-tertiary'}>
                        {feature.isPositive ? <CheckIcon /> : <CrossIcon />}
                      </span>
                      <span className={feature.isPositive ? 'text-text-secondary' : 'text-text-tertiary'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
