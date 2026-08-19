import type { HistoryImage } from '../types'

/**
 * 历史图片与技术时间轴节点的映射。
 * 索引与 src/data/timeline.ts 的 timelineItems 一一对应（同下标）。
 * 素材来自 public/images/，为公有领域历史照片与专利图纸。
 */
export const timelineHistoryImages: (HistoryImage[] | null)[] = [
  // 0 · 19 世纪末 — 概念雏形（首台自动间歇气压装置专利图纸）
  [
    {
      src: '/images/US2140898-0.png',
      caption: 'US 2,140,898 · 首台自动间歇气压装置（1938）',
      source: '美国专利局 · 公有领域',
      isVertical: true,
    },
  ],
  // 1 · 20 世纪中期 — 军方研发（Cotton 抗荷服）
  [
    {
      src: '/images/AWM_C217174_cotton_team_1941.JPG',
      caption: 'Cotton 抗荷服首次成功飞行试验合影（1941）',
      source: '澳大利亚战争纪念馆 · 公有领域',
    },
    {
      src: '/images/AWM_C20836_cotton_centrifuge.JPG',
      caption: 'Frank Cotton 在自制人体离心机中测试抗荷服',
      source: '澳大利亚战争纪念馆 · 公有领域',
    },
  ],
  // 2 · 1980 年代后 — 医院临床标准化（Flowtron Excel 主机）
  [
    {
      src: '/images/FlowtronExcel_8.jpg',
      caption: 'Flowtron Excel 主机实拍 · 英国医院 DVT 预防主力机',
      source: '二手医疗设备商实拍',
    },
    {
      src: '/images/FlowtronExcel_12.jpg',
      caption: 'Flowtron Excel 主机实拍 · 顶部提手与资产管理标签',
      source: '二手医疗设备商实拍',
    },
  ],
  // 3 · 2000 年代后 — 职业体育引入（序贯压缩专利群）
  [
    {
      src: '/images/US4029087-1.png',
      caption: 'US 4,029,087 · 多腔室序贯充气袖套结构原型（1977）',
      source: '美国专利局 · 公有领域',
      isVertical: true,
    },
    {
      src: '/images/US4054129-0.png',
      caption: 'US 4,054,129 · 三节段脉动加压系统（1977）',
      source: '美国专利局 · 公有领域',
      isVertical: true,
    },
  ],
  // 4 · Theratools 品牌节点 — 展示品牌产品图
  [
    {
      src: '/assets/2026-8-19.png',
      caption: 'Theratools 空气压力波运动恢复设备',
      source: 'Theratools 品牌',
    },
    {
      src: '/assets/1.png',
      caption: 'Theratools 气压恢复靴产品图',
      source: 'Theratools 品牌',
    },
  ],
]
