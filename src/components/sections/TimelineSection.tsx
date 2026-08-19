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
  const galleryRef = useRef<HTMLDivElement>(null)
  // 当前悬浮的节点（互斥：同一时刻只展开一个）
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

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

        {/* 左右分栏：左节点 + 右图片展示区 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* 左栏：时间轴节点（上下结构保持） */}
          <div className="relative pl-8">
            <div
              ref={lineRef}
              className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-white to-accent"
              style={{ transformOrigin: 'top center', transform: 'scaleY(0)' }}
              aria-hidden="true"
            />

            <div ref={nodesRef} className="flex flex-col gap-8">
              {timelineItems.map((item, i) => {
                const images = timelineHistoryImages[i]
                const isActive = activeIndex === i
                return (
                  <div
                    key={i}
                    className="relative timeline-node"
                  >
                    <div
                      className={`node-icon absolute left-[-32px] top-1 rounded-full p-1 transition-colors ${
                        item.isBrand ? 'text-accent' : isActive ? 'text-white' : 'text-text-tertiary'
                      }`}
                      style={{ opacity: 0 }}
                    >
                      {item.isBrand ? <LightningIcon size={24} /> : <ClockIcon size={24} />}
                    </div>
                    {/* 文字区域：悬浮/滑过即切换右侧图片 */}
                    <div
                      className="node-content pl-4 cursor-pointer"
                      style={{ opacity: 0 }}
                      onPointerEnter={() => images && setActiveIndex(i)}
                      onPointerLeave={() => images && setActiveIndex((cur) => (cur === i ? null : cur))}
                    >
                      <h3 className={`text-lg font-bold mb-1 ${item.isBrand ? 'text-accent' : 'text-white'}`}>
                        {item.year}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 右栏：固定图片展示区（仅 lg+ 显示） */}
          <div className="hidden lg:block">
            <HistoryGallery
              galleryRef={galleryRef}
              activeIndex={activeIndex}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 右侧历史图片展示区 ---------- */

// 默认展示的节点：20 世纪中期（抗荷服照片），避免右侧为空
const DEFAULT_INDEX = 1

interface HistoryGalleryProps {
  galleryRef: React.RefObject<HTMLDivElement | null>
  activeIndex: number | null
}

function HistoryGallery({ galleryRef, activeIndex }: HistoryGalleryProps) {
  const [renderedIndex, setRenderedIndex] = useState<number>(DEFAULT_INDEX)
  // 鼠标是否在右栏内（锁定当前图片，不随左节点悬浮变化）
  const hoveredRightRef = useRef(false)
  // 放大的图片索引（null = 未放大）
  const [zoomedImg, setZoomedImg] = useState<{ group: number; img: number } | null>(null)

  // Esc 关闭放大
  useEffect(() => {
    if (!zoomedImg) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedImg(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomedImg])

  // 悬浮节点变化 → 切换图片（仅当鼠标不在右栏内时）
  useEffect(() => {
    if (hoveredRightRef.current) return
    if (activeIndex === null) return
    const images = timelineHistoryImages[activeIndex]
    if (!images) return

    const panel = galleryRef.current?.querySelector('[data-gallery-panel]')
    if (panel) {
      // 旧图淡出 → 换新图
      gsap.to(panel, {
        autoAlpha: 0,
        y: -14,
        scale: 0.98,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setRenderedIndex(activeIndex),
      })
    } else {
      setRenderedIndex(activeIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  // 新图组入场
  useEffect(() => {
    if (renderedIndex === null || !galleryRef.current) return
    if (prefersReducedMotion()) return

    const panel = galleryRef.current.querySelector('[data-gallery-panel]')
    const items = panel?.querySelectorAll('.history-item')
    if (!panel) return

    gsap.fromTo(
      panel,
      { autoAlpha: 0, y: 20, scale: 0.97 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, ease: 'power3.out', overwrite: 'auto' }
    )
    if (items) {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power3.out', overwrite: 'auto' }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderedIndex])

  const images = renderedIndex !== null ? timelineHistoryImages[renderedIndex] : null

  return (
    <div
      ref={galleryRef}
      className="sticky top-24 flex items-start justify-center min-h-[440px]"
      onPointerEnter={() => {
        hoveredRightRef.current = true
      }}
      onPointerLeave={() => {
        hoveredRightRef.current = false
      }}
    >
      {images && (
        <div data-gallery-panel className="flex flex-col gap-5">
          <div className="flex flex-wrap justify-center gap-5">
            {images.map((img, j) => (
              <figure
                key={j}
                className={`history-item flex flex-col gap-2 cursor-zoom-in ${
                  img.isVertical ? 'w-56' : 'w-[380px]'
                }`}
                onClick={() => setZoomedImg({ group: renderedIndex, img: j })}
              >
                <div className="overflow-hidden rounded-xl bg-bg-secondary border border-border">
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    className={`w-full h-auto object-cover transition-all duration-300 hover:scale-105 ${
                      zoomedImg?.group === renderedIndex && zoomedImg?.img === j
                        ? 'scale-110 rounded-none border-accent/50'
                        : ''
                    }`}
                  />
                </div>
                <figcaption className="text-xs text-text-secondary leading-snug">
                  {img.caption}
                </figcaption>
                <span className="text-[10px] text-text-tertiary">{img.source}</span>
              </figure>
            ))}
          </div>

          {/* 放大遮罩：Portal 到 body，全屏居中 + 右上角关闭 + 点空白/Esc 关闭 */}
          {zoomedImg &&
            createPortal(
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-8"
                onClick={() => setZoomedImg(null)}
              >
                {/* 右上角关闭叉 */}
                <button
                  type="button"
                  aria-label="关闭大图"
                  onClick={() => setZoomedImg(null)}
                  className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors cursor-pointer z-[1]"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>

                {/* 图片区：点击图片本身不关闭 */}
                <figure
                  className="max-w-4xl w-full flex flex-col gap-3 cursor-zoom-out"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={zoomedImgSrc(zoomedImg)}
                    alt=""
                    className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-2xl"
                  />
                  <figcaption className="text-center text-sm text-text-secondary">
                    {zoomedImgCaption(zoomedImg)}
                  </figcaption>
                </figure>
              </div>,
              document.body
            )}
        </div>
      )}
    </div>
  )
}

/* 放大遮罩辅助：取放大图片的 src 与说明 */
function zoomedImgSrc(z: { group: number; img: number }): string {
  const group = timelineHistoryImages[z.group]
  return group?.[z.img]?.src ?? ''
}

function zoomedImgCaption(z: { group: number; img: number }): string {
  const group = timelineHistoryImages[z.group]
  return group?.[z.img]?.caption ?? ''
}
