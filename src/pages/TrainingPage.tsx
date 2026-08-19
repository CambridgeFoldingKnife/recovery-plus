import PageHero from '../components/ui/PageHero'
import TrainingSection from '../components/sections/TrainingSection'

export default function TrainingPage() {
  return (
    <>
      <PageHero
        label="Theratools 培训"
        title="培训中心"
        subtitle="线上课程与线下实训，帮个人和团队把设备真正用起来。"
      />
      <TrainingSection />
    </>
  )
}
