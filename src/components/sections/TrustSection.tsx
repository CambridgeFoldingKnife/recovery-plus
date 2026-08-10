import { trustStats, trustTexts } from '../../data/trust'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'

export default function TrustSection() {
  return (
    <section className="section section--tight">
      <div className="container container--narrow">
        <SectionHeader
          label="专业背书"
          title={<>用极致的细节，回应所有的期待。</>}
          centered
        />

        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {trustStats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-1">
                  {stat.number}
                  <small className="text-lg font-medium text-text-tertiary">{stat.unit}</small>
                </p>
                <p className="text-xs text-text-tertiary">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-4 text-center">
            {trustTexts.map((text, i) => (
              <p
                key={i}
                className={`leading-relaxed ${
                  i === trustTexts.length - 1
                    ? 'text-white font-semibold'
                    : 'text-text-secondary'
                }`}
              >
                {text}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
