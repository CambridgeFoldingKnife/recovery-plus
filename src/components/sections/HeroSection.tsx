import { useRef } from 'react'
import { heroData } from '../../data/hero'
import Button from '../ui/Button'
import MagneticButton from '../ui/MagneticButton'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ledeRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const pillsRef = useRef<HTMLUListElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const scrollToScenes = () => {
    document.getElementById('scenes')?.scrollIntoView({ behavior: 'smooth' })
  }

  useGSAP(() => {
    if (prefersReducedMotion()) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Content entrance sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(labelRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0)
        .fromTo(ledeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.55)
        .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.65)
        .fromTo(pillsRef.current?.children ?? [], { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.5 }, 0.75)
        .fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.9)

      // Title: char-by-char blur reveal
      const chars = titleRef.current?.querySelectorAll('.blur-char')
      if (chars) {
        tl.fromTo(chars, {
          filter: 'blur(10px)',
          opacity: 0,
          y: 20,
        }, {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          stagger: 0.025,
          ease: 'power3.out',
          duration: 0.5,
        }, 0.1)
      }

      // 4. Scroll: parallax + fade out
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: true,
        },
      })
    })
  }, { scope: sectionRef })

  const titleLines = heroData.title.split('\n')

  return (
    <section ref={sectionRef} id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Breathing background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('/assets/hero2.png')] bg-cover bg-center origin-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-bg-primary" aria-hidden="true" />

      <div ref={contentRef} className="container relative z-10 py-24 lg:py-32 text-center">
        <p ref={labelRef} className="text-2xl tracking-[0.2em] uppercase text-text-tertiary font-medium mb-6 text-center" style={{ opacity: 0 }}>
          {heroData.label}
        </p>

        <h1
          ref={titleRef}
          className="text-display font-extrabold leading-[1.05] tracking-tight mb-6 max-w-[900px] mx-auto translate-x-[22px]"
        >
          {titleLines.map((line, lineIdx) => (
            <span key={lineIdx} className="block overflow-hidden whitespace-nowrap">
              <span className="block will-change-transform">
                {line.split('').map((char, charIdx) => {
                  const isPunct = '\uFF0C\u3002\u3001\uFF1B\uFF1A\uFF01\uFF1F'.includes(char)
                  return (
                    <span
                      key={charIdx}
                      className={`blur-char inline-block ${isPunct ? 'text-[0.78em]' : ''}`}
                      style={prefersReducedMotion() ? { filter: 'none', opacity: 1, transform: 'none' } : undefined}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  )
                })}
              </span>
            </span>
          ))}
        </h1>

        <p ref={ledeRef} className="text-xl text-text-secondary mb-2 gradient-text font-semibold" style={{ opacity: 0 }}>
          {heroData.lede}
        </p>

        <p ref={descRef} className="text-lg text-text-secondary max-w-[560px] mx-auto mb-8" style={{ opacity: 0 }}>
          {heroData.desc}
        </p>

        <ul ref={pillsRef} className="flex flex-wrap gap-2 mb-8 justify-center" aria-label="核心参数">
          {heroData.pills.map((pill, i) => (
            <li
              key={i}
              className="px-4 py-2 rounded-full border border-[#333] text-base text-text-secondary bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:border-accent/40 hover:text-white"
              style={{ opacity: 0 }}
            >
              {pill.text}
            </li>
          ))}
        </ul>

        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center" style={{ opacity: 0 }}>
          <MagneticButton>
            <Button variant="primary" href={heroData.primaryCta.href}>
              {heroData.primaryCta.text}
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button variant="ghost" onClick={scrollToScenes}>
              {heroData.secondaryCta.text}
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
