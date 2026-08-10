import { heroData } from '../../data/hero'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

export default function HeroSection() {
  const scrollToScenes = () => {
    document.getElementById('scenes')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/assets/hero.png')] bg-cover bg-center" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-bg-primary" aria-hidden="true" />

      <div className="container relative z-10 py-24 lg:py-32 text-center">
        <Reveal className="mb-6">
          <p className="text-xs tracking-[0.2em] uppercase text-text-tertiary font-medium">{heroData.label}</p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-display font-extrabold leading-[1.05] tracking-tight mb-6 max-w-[900px] mx-auto whitespace-nowrap ">
            {heroData.title}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-lg text-text-secondary mb-2">{heroData.lede}</p>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-text-secondary max-w-[560px] mx-auto mb-8">{heroData.desc}</p>
        </Reveal>

        <Reveal delay={400}>
          <ul className="flex flex-wrap gap-2 mb-8 justify-center" aria-label="核心参数">
            {heroData.pills.map((pill, i) => (
              <li key={i} className="px-4 py-2 rounded-full border border-[#333] text-sm text-text-secondary bg-white/[0.03] backdrop-blur-sm">
                {pill.text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={500}>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" href={heroData.primaryCta.href}>
              {heroData.primaryCta.text}
            </Button>
            <Button variant="ghost" onClick={scrollToScenes}>
              {heroData.secondaryCta.text}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
