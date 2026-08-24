import { useRef } from 'react'
import { products } from '../../data/products'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Reveal from '../ui/Reveal'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

function AirChamberBars() {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end gap-1.5 bg-gradient-to-t from-black/70 to-transparent">
      <div className="flex gap-1 items-end h-8">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="air-bar w-2 rounded-full bg-accent origin-bottom"
            style={{ transform: 'scaleY(0.15)', opacity: 0.4, height: 32 }}
          />
        ))}
      </div>
      <span className="text-[10px] text-white/60 ml-1">气囊梯度充气</span>
    </div>
  )
}

export default function ProductShowcaseSection({ images }: { images?: string[] } = {}) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Air chamber inflation loop
      const bars = cardsRef.current?.querySelectorAll('.air-bar')
      if (bars) {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, defaults: { ease: 'power2.inOut' } })
        bars.forEach((bar, i) => {
          tl.to(bar, { scaleY: 1, opacity: 1, duration: 0.5 }, i * 0.35)
            .to(bar, { scaleY: 0.15, opacity: 0.4, duration: 0.4 }, i * 0.35 + 0.9)
        })
      }

      // Stagger cards from left/right
      const cards = cardsRef.current?.querySelectorAll('.product-card')
      if (cards) {
        gsap.fromTo(cards, { opacity: 0, x: (i) => i % 2 === 0 ? -40 : 40 }, {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          ease: 'power3.out',
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        })
      }
    })
  }, { scope: sectionRef })

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(el, {
      rotateY: px * 6,
      rotateX: -py * 6,
      transformPerspective: 900,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleTiltReset = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  return (
    <section ref={sectionRef} className="section" id="products">
      <div className="container">
        <SectionHeader
          label="产品中心"
          title={<>气囊一段一段压，<br />双腿一点一点松。</>}
          subtitle="Theratools 通过足部、小腿、膝部和大腿四段气囊，按照设定顺序充气和释放。压力由远端向近端移动，形成连续、有节奏的包裹感。"
          centered
        />

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {products.map((product, i) => (
            <Reveal key={i} delay={i * 120}>
              <div
                className="product-card h-full"
                style={{ perspective: 900 }}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltReset}
              >
                <Card className="h-full" glow>
                  <div className="relative aspect-[4/3] overflow-hidden bg-bg-secondary">
                    <img
                      src={images?.[i] ?? product.imageSrc}
                      alt={`Theratools ${product.label}`}
                      loading="lazy"
                      className="w-full h-full object-cover block transition-transform duration-500 hover:scale-105"
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
                    <AirChamberBars />
                  </div>

                  <div className="p-6">
                    <p className="text-xs tracking-[0.2em] uppercase text-text-tertiary font-medium mb-2">
                      {product.label}
                    </p>
                    <p className="text-text-secondary text-base leading-relaxed mb-4">
                      {product.description}
                    </p>

                    <ul className="grid grid-cols-2 gap-3">
                      {product.specs.map((spec, j) => (
                        <li key={j}>
                          <span className="block text-lg text-text-tertiary mb-0.5">{spec.label}</span>
                          <b className="text-xl">{spec.value}</b>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
