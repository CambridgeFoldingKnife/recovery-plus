import type { ProductCard } from '../types'

export const products: ProductCard[] = [
  {
    badge: '高压便携款',
    imageSrc: '/assets/001.jpg',
    label: '高压便携款',
    description:
      '最高 270 mmHg 压力，外置泵设计。轻量便携，六独立气囊覆盖足部至大腿全腿。适合追求极致压力的专业运动人群。',
    specs: [
      { label: '最高压力', value: '270 mmHg' },
      { label: '气囊分区', value: '6 区' },
      { label: '气泵', value: '外置' },
      { label: '热敷 & 振动', value: '—' },
    ],
  },
  {
    badge: '全能一体款',
    badgeAccent: true,
    imageSrc: '/assets/8.png',
    label: '全能一体款',
    description:
      '内置气泵，无外管设计。在气压压缩基础上增加热敷理疗与振动按摩，打造完整恢复体验。一键开机，无需组装。',
    specs: [
      { label: '最高压力', value: '220 mmHg' },
      { label: '气囊分区', value: '6 区' },
      { label: '气泵', value: '内置' },
      { label: '热敷 & 振动', value: '有' },
    ],
  },
]
