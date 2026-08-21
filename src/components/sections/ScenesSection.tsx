import { useRef } from 'react'
import { scenes, sceneImage } from '../../data/scenes'
import SectionHeader from '../ui/SectionHeader'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

export default function ScenesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Image parallax
      gsap.fromTo(imageRef.current, { y: 40 }, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Scene items stagger in from left
      const items = itemsRef.current?.querySelectorAll('.scene-item')
      if (items) {
        gsap.fromTo(items, { opacity: 0, x: -30 }, {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          ease: 'power3.out',
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        })
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section" id="scenes">
      <div className="container">
        <SectionHeader
          label="运动恢复场景"
          title={<>跑完、练完、赛完，<br />恢复各有重点。</>}
          subtitle={`运动不同，双腿承受的压力也不同。${'\n'}按运动项目选择恢复重点，不用一套程序应付所有训练。`}
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div ref={itemsRef} className="flex flex-col gap-8">
            {scenes.map((scene, i) => (
              <div key={i} className="scene-item" style={{ opacity: 0 }}>
                <h3 className="text-xl font-bold mb-1">{scene.title}</h3>
                <p className="text-base text-accent font-medium mb-2">{scene.subtitle}</p>
                <p className="text-text-secondary leading-relaxed">{scene.description}</p>
              </div>
            ))}
          </div>

          <RevealWrapper>
            <div className="relative h-[410px] rounded-xl overflow-hidden will-change-transform">
              <img
                ref={imageRef}
                src={sceneImage.src}
                alt={sceneImage.alt}
                width={2752}
                height={1536}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}

// Simple wrapper for initial reveal, then parallax takes over
function RevealWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.fromTo(ref.current, { opacity: 0, y: 30 }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: ref })
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
