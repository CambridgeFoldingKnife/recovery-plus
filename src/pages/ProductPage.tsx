import PageHero from '../components/ui/PageHero'
import ProductInsightSection from '../components/sections/ProductInsightSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import ComparisonSection from '../components/sections/ComparisonSection'
import ProductShowcaseSection from '../components/sections/ProductShowcaseSection'

export default function ProductPage() {
  return (
    <>
      <PageHero
        label="Theratools 产品"
        title="产品中心"
        subtitle="从设计理念、核心功能到市场对比，全面了解 Theratools 空气压力波运动恢复设备。"
      />
      <ProductInsightSection />
      <FeaturesSection />
      <ComparisonSection />
      <ProductShowcaseSection />
    </>
  )
}
