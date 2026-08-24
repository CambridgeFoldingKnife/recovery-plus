import { trainingCards } from '../../data/training'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import Card from '../ui/Card'
import { MonitorIcon, BookIcon, ClipboardIcon } from '../ui/Icons'
import type { ReactNode } from 'react'

const iconMap: Record<string, ReactNode> = {
  monitor: <MonitorIcon />,
  book: <BookIcon />,
  clipboard: <ClipboardIcon />,
}

export default function TrainingSection() {
  return (
    <section className="section" id="training">
      <div className="container">
        <SectionHeader
          label="培训中心"
          title={<>买到设备，也要学会怎么用。</>}
          subtitle="Theratools 为康复师、队医、教练和机构团队提供线上课程与线下实训。"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainingCards.map((card, i) => (
            <Reveal key={i} delay={i * 120}>
              <Card className="p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-border flex items-center justify-center text-text-secondary mb-4">
                  {iconMap[card.iconSvg]}
                </div>
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-text-secondary text-base leading-relaxed mb-4">{card.description}</p>
                <ul className="flex flex-col gap-2">
                  {card.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
