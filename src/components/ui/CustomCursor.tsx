import { useRef, useEffect } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const isVisible = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const ring = ringRef.current
    const label = labelRef.current
    if (!ring || !label) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible.current) {
        isVisible.current = true
        gsap.to(ring, { opacity: 1, duration: 0.3 })
      }
    }

    const onLeave = () => {
      isVisible.current = false
      gsap.to([ring, label], { opacity: 0, duration: 0.3 })
    }

    const onEnter = () => {
      isVisible.current = true
      gsap.to(ring, { opacity: 1, duration: 0.3 })
    }

    const tickerId = gsap.ticker.add(() => {
      gsap.to(ring, {
        x: pos.current.x,
        y: pos.current.y,
        duration: 0.35,
        ease: 'power2.out',
      })
    })

    const onOverInteractive = (e: Event) => {
      const target = e.target as HTMLElement
      const el = target.closest('a, button, [role="button"], .magnetic')
      if (el) {
        gsap.to(ring, {
          scale: 2.2,
          borderColor: 'rgba(199, 242, 91, 0.5)',
          duration: 0.3,
          ease: 'power2.out',
        })
        const hintText = el.getAttribute('data-cursor')
        if (hintText) {
          label.textContent = hintText
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.25 })
        }
      }
    }

    const onOutInteractive = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], .magnetic')) {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
        })
        gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 })
      }
    }

    const onClick = () => {
      gsap.fromTo(ring, { scale: 1 }, {
        scale: 0.8,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOverInteractive)
    document.addEventListener('mouseout', onOutInteractive)
    document.addEventListener('click', onClick)

    gsap.set(ring, { opacity: 0 })

    return () => {
      gsap.ticker.remove(tickerId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOverInteractive)
      document.removeEventListener('mouseout', onOutInteractive)
      document.removeEventListener('click', onClick)
    }
  }, [])

  if (typeof window !== 'undefined' && prefersReducedMotion()) return null

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.3)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[10001] pointer-events-none text-[10px] font-semibold tracking-wider uppercase text-accent"
        style={{
          transform: 'translate(-50%, -50%) scale(0.8)',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
        aria-hidden="true"
      />
    </>
  )
}
