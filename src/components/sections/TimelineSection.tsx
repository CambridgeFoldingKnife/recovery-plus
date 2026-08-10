import { timelineItems } from '../../data/timeline'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { ClockIcon, LightningIcon } from '../ui/Icons'

export default function TimelineSection() {
  return (
    <section className="section" id="technology">
      <div className="container container--narrow">
        <SectionHeader
          label="技术溯源"
          title={<>一项走过全球康复专业的技术，<br />现在为运动恢复重新设计。</>}
          centered
        />

        <div className="relative pl-8">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#222]" aria-hidden="true" />

          <div className="flex flex-col gap-8">
            {timelineItems.map((item, i) => (
              <Reveal key={i} delay={i * 80} className="relative">
                <div className={`absolute left-[-32px] top-1 rounded-full p-1 ${
                  item.isBrand ? 'text-accent' : 'text-text-tertiary'
                }`}>
                  {item.isBrand ? <LightningIcon size={24} /> : <ClockIcon size={24} />}
                </div>
                <div className="pl-4">
                  <h3 className={`text-lg font-bold mb-1 ${item.isBrand ? 'text-accent' : 'text-white'}`}>
                    {item.year}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
