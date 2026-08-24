import { productInsight } from '../../data/hero'
import Reveal from '../ui/Reveal'

export default function ProductInsightSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <Reveal>
            <div className="relative h-[420px] rounded-xl overflow-hidden">
              <img
                src={productInsight.imageSrc}
                alt="Theratools 空气压力波运动恢复设备"
                width={2368}
                height={1792}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {productInsight.title}
            </h2>
            <p className="text-lg text-text-secondary mb-4">
              {productInsight.subtitle}
            </p>
            {productInsight.descriptions.map((desc, i) => (
              <p key={i} className="text-text-secondary leading-relaxed mb-3">
                {desc}
              </p>
            ))}

            {/* 核心卖点要点：填充右侧高度，与左侧图片对齐 */}
            <ul className="flex flex-col gap-2.5 mt-5 mb-6">
              {productInsight.highlights.map((hl, i) => (
                <li key={i} className="flex items-center gap-2.5 text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg font-bold text-white whitespace-pre-line">
              {productInsight.emphasis}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
