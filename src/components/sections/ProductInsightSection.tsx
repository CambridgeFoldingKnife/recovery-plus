import { productInsight } from '../../data/hero'
import Reveal from '../ui/Reveal'

export default function ProductInsightSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <Reveal>
            <img
              src={productInsight.imageSrc}
              alt="Theratools 空气压力波运动恢复设备"
              width={2368}
              height={1792}
              className="rounded-xl"
            />
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
            <p className="text-lg font-bold text-white whitespace-pre-line mt-6">
              {productInsight.emphasis}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
