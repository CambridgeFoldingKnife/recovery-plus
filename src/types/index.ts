export interface TimelineItem {
  year: string
  description: string
  isBrand?: boolean
}

export interface FeatureCard {
  iconSvg: string // use icon key from Icons
  title: string
  description: string
}

export interface ComparisonFeature {
  text: string
  isPositive: boolean
}

export interface ComparisonCard {
  title: string
  subtitle: string
  isHighlighted?: boolean
  features: ComparisonFeature[]
}

export interface ProductSpec {
  label: string
  value: string
}

export interface ProductCard {
  badge: string
  badgeAccent?: boolean
  imageSrc: string
  label: string
  description: string
  specs: ProductSpec[]
}

export interface SceneItem {
  title: string
  subtitle: string
  description: string
}

export interface TrustStat {
  number: string
  unit: string
  label: string
}

export interface TrainingCard {
  iconSvg: string
  title: string
  description: string
  bullets: string[]
}

export interface HeroPill {
  text: string
}

export interface HeroData {
  label: string
  title: string
  lede: string
  desc: string
  pills: HeroPill[]
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  id: string
  title: string
  items: FAQItem[]
}
