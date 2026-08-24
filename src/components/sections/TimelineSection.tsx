import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { timelineItems } from '../../data/timeline'
import { timelineHistoryImages } from '../../data/timeline-history'
import SectionHeader from '../ui/SectionHeader'
import { ClockIcon, LightningIcon } from '../ui/Icons'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<HTMLDivElement>(null)
  // 当前 Dock 放大中的节点索引（null = 无）
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  // 全屏放大的图片
  const [zoomed, setZoomed] = useState<{ group: number; img: number } | null>(null)

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

          // Icon pops in first（从可见状态增强，不依赖 opacity 隐藏）
          tl.fromTo(icon, { scale: 0.6 }, {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(2)',
          })

          // Content slides in from right（内容始终可见，只做位移动画）
          tl.fromTo(content, { x: 24 }, {
            x: 0,
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

        {/* 时间轴：缩略图在时钟左侧，Dock 磁吸放大 */}
        <div className="relative">
          {/* 竖线：穿过时钟列中心（缩略图列 120px + 时钟列中心） */}
          <div
            ref={lineRef}
            className="absolute left-[150px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent via-white to-accent z-0"
            style={{ transformOrigin: 'top center', transform: 'scaleY(0)' }}
            aria-hidden="true"
          />

          <div ref={nodesRef} className="flex flex-col gap-10">
            {timelineItems.map((item, i) => {
              const images = timelineHistoryImages[i]
              return (
                <div key={i} className="relative timeline-node">
                  {/* 三列 grid：缩略图列(120) | 时钟列(60) | 文字 */}
                  <div className="grid grid-cols-[120px_60px_1fr] items-center">
                    {/* 缩略图（时钟左侧） */}
                    <div className="flex justify-end pr-3">
                      {images && (
                        <Thumbnail
                          images={images}
                          index={i}
                          hoverIndex={hoverIndex}
                          onHover={setHoverIndex}
                          onZoom={setZoomed}
                        />
                      )}
                    </div>
                    {/* 时钟图标（节点），居中对齐竖线 */}
                    <div
                      className={`node-icon justify-self-center rounded-full p-1 z-10 bg-bg-primary ${
                        item.isBrand ? 'text-accent' : 'text-text-tertiary'
                      }`}
                    >
                      {item.isBrand ? <LightningIcon size={24} /> : <ClockIcon size={24} />}
                    </div>
                    {/* 文字 */}
                    <div className="node-content pl-4 min-w-0">
                      <h3 className={`text-lg font-bold mb-1 ${item.isBrand ? 'text-accent' : 'text-white'}`}>
                        {item.year}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 全屏放大遮罩（Portal 到 body） */}
      {zoomed &&
        createPortal(
          <ZoomOverlay zoomed={zoomed} onClose={() => setZoomed(null)} />,
          document.body
        )}
    </section>
  )
}

/* ---------- 节点缩略图：Dock 磁吸放大 + 多图滑动切换 ---------- */

interface ThumbnailProps {
  images: import('../../types').HistoryImage[]
  index: number
  hoverIndex: number | null
  onHover: (i: number | null) => void
  onZoom: (z: { group: number; img: number }) => void
}

function Thumbnail({ images, index, hoverIndex, onHover, onZoom }: ThumbnailProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [currentImg, setCurrentImg] = useState(0)
  const dragStartX = useRef<number | null>(null)

  // 放大：仅当前悬浮的缩略图放大，相邻不联动
  useEffect(() => {
    if (!imgRef.current || prefersReducedMotion()) return
    let scale = 1
    if (hoverIndex === index) scale = 1.7
    gsap.to(imgRef.current, {
      scale,
      duration: 0.35,
      ease: 'back.out(1.6)',
      overwrite: 'auto',
    })
  }, [hoverIndex, index])

  // 多图：左右滑动切换（pointer 按下-抬起判定方向）
  const draggedRef = useRef(false)

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX
    draggedRef.current = false
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null || images.length < 2) {
      dragStartX.current = null
      return
    }
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) > 20) {
      draggedRef.current = true
      setCurrentImg((cur) => (cur + (dx < 0 ? 1 : images.length - 1)) % images.length)
    }
    dragStartX.current = null
  }

  // 放大：仅当未拖动（点击）才触发
  const handleClick = () => {
    if (draggedRef.current) return
    onZoom({ group: index, img: currentImg })
  }

  const img = images[currentImg]

  return (
    <button
      type="button"
      className="relative shrink-0 cursor-pointer group"
      onPointerEnter={() => onHover(index)}
      onPointerLeave={() => onHover(null)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      style={{ perspective: 400 }}
      aria-label={img.caption}
    >
      <img
        ref={imgRef}
        src={img.src}
        alt={img.caption}
        loading="lazy"
        className="w-24 aspect-[4/3] rounded-lg object-cover shadow-lg shadow-black/40"
        draggable={false}
      />
      {/* 多图提示小圆点 */}
      {images.length > 1 && (
        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent text-[9px] text-[#0a0a0a] font-bold flex items-center justify-center">
          {images.length}
        </span>
      )}
      {/* 滑动提示 */}
      {images.length > 1 && (
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="text-[9px] text-white bg-black/60 rounded-full px-1.5 py-0.5">← 滑动 →</span>
        </span>
      )}
    </button>
  )
}

/* ---------- 全屏放大遮罩 ---------- */

interface ZoomOverlayProps {
  zoomed: { group: number; img: number }
  onClose: () => void
}

function ZoomOverlay({ zoomed, onClose }: ZoomOverlayProps) {
  // Esc 关闭
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const images = timelineHistoryImages[zoomed.group]
  const img = images?.[zoomed.img]

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-8"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="关闭大图"
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors cursor-pointer z-[1]"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {img && (
        <figure className="max-w-4xl w-full flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
          <img
            src={img.src}
            alt={img.caption}
            className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-2xl"
          />
          <figcaption className="text-center text-base text-text-secondary">{img.caption}</figcaption>
        </figure>
      )}
    </div>
  )
}
