import type { SceneItem } from '../types'

export const scenes: SceneItem[] = [
  {
    title: '跑步与马拉松',
    subtitle: '跑量往上加，恢复别落下',
    description:
      '长距离跑步后，小腿、足底和跟腱区域承受了持续冲击。跑后用一次全腿气压程序，别把今天的公里数带进明天。',
  },
  {
    title: '力量训练与 CrossFit',
    subtitle: '今天腿练透，明天路照走',
    description:
      '深蹲、硬拉和腿举之后，大腿和膝周容易紧绷。训练结束就恢复，别等上下楼时才想起来。',
  },
  {
    title: '球类运动',
    subtitle: '比赛打满场，恢复别缺场',
    description:
      '急停、起跳和变向让双腿承担不同负荷。赛后安排分区恢复，为下一次训练或比赛留出状态。',
  },
]

export const sceneImage = {
  src: '/assets/7.png',
  alt: '运动后使用 Theratools 空气压力波恢复',
}
