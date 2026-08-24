import { features } from '../../data/features'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import Card from '../ui/Card'
import {
  ShieldIcon, ClockAltIcon, UsersIcon, MusicIcon, BagIcon, ActivityIcon,
} from '../ui/Icons'
import type { ReactNode } from 'react'

const iconMap: Record<string, ReactNode> = {
  shield: <ShieldIcon />,
  'clock-alt': <ClockAltIcon />,
  users: <UsersIcon />,
  music: <MusicIcon />,
  bag: <BagIcon />,
  activity: <ActivityIcon />,
}

export default function FeaturesSection() {
  return (
    <section className="section section--tight">
      <div className="container">
        <SectionHeader
          label="专业恢复"
          title={<>专业恢复，也可以很简单。</>}
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Reveal key={i} delay={i * 80}>
              <Card className="p-6 h-full">
                <div className="w-14 h-14 rounded-xl bg-white/[0.04] border border-border flex items-center justify-center text-text-secondary mb-4">
                  {iconMap[feature.iconSvg]}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-base leading-relaxed">{feature.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
