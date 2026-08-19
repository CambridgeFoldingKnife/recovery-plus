import { products } from '../../data/products'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import Card from '../ui/Card'

export default function ProductShowcaseSection() {
  return (
    <section className="section" id="products">
      <div className="container">
        <SectionHeader
          label="产品中心"
          title={<>气囊一段一段压，<br />双腿一点一点松。</>}
          subtitle="Theratools 通过足部、小腿、膝部和大腿四段气囊，按照设定顺序充气和释放。压力由远端向近端移动，形成连续、有节奏的包裹感。"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {products.map((product, i) => (
            <Reveal key={i} delay={i * 120}>
              <Card className="h-full">
                <div className="relative aspect-[4/3] overflow-hidden bg-bg-secondary">
                  <img
                    src={product.imageSrc}
                    alt={`Theratools ${product.label}`}
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      product.badgeAccent
                        ? 'bg-accent text-[#0a0a0a]'
                        : 'bg-white text-[#0a0a0a]'
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-text-tertiary font-medium mb-2">
                    {product.label}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <ul className="grid grid-cols-2 gap-3">
                    {product.specs.map((spec, j) => (
                      <li key={j}>
                        <span className="block text-xs text-text-tertiary mb-0.5">{spec.label}</span>
                        <b className="text-sm">{spec.value}</b>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
