import type { ComparisonCard } from '../types'

export const comparisonCards: ComparisonCard[] = [
  {
    title: '筋膜枪',
    subtitle: '物理击打式',
    features: [
      { text: '击打深度 1-2cm', isPositive: true },
      { text: '无法促进静脉回流', isPositive: false },
      { text: '需要手持操作', isPositive: false },
      { text: '震手感、噪音大', isPositive: false },
      { text: '使用不当反伤肌肉', isPositive: false },
    ],
  },
  {
    title: 'Theratools 空气压力波',
    subtitle: '医疗级气压回流',
    isHighlighted: true,
    features: [
      { text: '穿透深度 全层组织', isPositive: true },
      { text: '重建静脉回流路径', isPositive: true },
      { text: '穿戴上自动运行', isPositive: true },
      { text: '≤42dB 静音', isPositive: true },
      { text: '康复科40年临床验证', isPositive: true },
    ],
  },
  {
    title: '普通按摩仪',
    subtitle: '揉捏/振动式',
    features: [
      { text: '揉捏放松表层', isPositive: true },
      { text: '无深层循环作用', isPositive: false },
      { text: '机械硬接触不适', isPositive: false },
      { text: '无法覆盖全腿', isPositive: false },
      { text: '无临床数据支撑', isPositive: false },
    ],
  },
]
