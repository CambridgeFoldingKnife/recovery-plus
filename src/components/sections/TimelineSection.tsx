import { useRef } from 'react'
import { timelineItems } from '../../data/timeline'
import SectionHeader from '../ui/SectionHeader'
import { ClockIcon, LightningIcon } from '../ui/Icons'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Line draw synced to scroll
      gsap.fromTo(lineRef.current, { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 0.3,
        },
      })

      // Each node reveals individually as scroll reaches it
      const nodes = nodesRef.current?.querySelectorAll('.timeline-node')
      if (nodes) {
        nodes.forEach((node, i) => {
          const content = node.querySelector('.node-content')
          const icon = node.querySelector('.node-icon')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: node,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          })

          // Icon pops in first
          tl.fromTo(icon, { scale: 0, opacity: 0 }, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(2)',
          })

          // Content slides in from right
          tl.fromTo(content, { x: 30, opacity: 0 }, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
          }, '-=0.2')

          // Glow pulse on the icon
          if (timelineItems[i]?.isBrand) {
            tl.fromTo(icon, { boxShadow: '0 0 0px rgba(199,242,91,0)' }, {
              boxShadow: '0 0 20px rgba(199,242,91,0.4)',
              duration: 0.6,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut',
            }, '-=0.3')
          }
        })
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section" id="technology">
      <div className="container container--narrow">
        <SectionHeader
          label="技术溯源"
          title={<>一项走过全球康复专业的技术，<br />现在为运动恢复重新设计。</>}
          centered
        />

        <div className="relative pl-8">
          {/* Timeline line — grows on scroll */}
          <div
            ref={lineRef}
            className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-white to-accent"
            style={{ transformOrigin: 'top center', transform: 'scaleY(0)' }}
            aria-hidden="true"
          />

          <div ref={nodesRef} className="flex flex-col gap-8">
            {timelineItems.map((item, i) => (
              <div key={i} className="relative timeline-node">
                <div
                  className={`node-icon absolute left-[-32px] top-1 rounded-full p-1 ${
                    item.isBrand ? 'text-accent' : 'text-text-tertiary'
                  }`}
                  style={{ opacity: 0 }}
                >
                  {item.isBrand ? <LightningIcon size={24} /> : <ClockIcon size={24} />}
                </div>
                <div className="node-content pl-4" style={{ opacity: 0 }}>
                  <h3 className={`text-lg font-bold mb-1 ${item.isBrand ? 'text-accent' : 'text-white'}`}>
                    {item.year}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
