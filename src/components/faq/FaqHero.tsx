import Reveal from '../ui/Reveal'

export default function FaqHero() {
  return (
    <section className="pt-12 pb-8 text-center">
      <div className="container container--narrow">
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-text-tertiary font-medium mb-4">Theratools</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">常见问题</h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-text-secondary leading-relaxed">
            关于空气压力波运动恢复设备的常见疑问，我们为您整理了最全面的解答（共 12 类 70 条）。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
