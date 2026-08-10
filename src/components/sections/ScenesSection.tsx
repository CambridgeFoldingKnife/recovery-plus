import { scenes, sceneImage } from '../../data/scenes'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'

export default function ScenesSection() {
  return (
    <section className="section" id="scenes">
      <div className="container">
        <SectionHeader
          label="运动恢复场景"
          title={<>跑完、练完、赛完，<br />恢复各有重点。</>}
          subtitle="运动不同，双腿承受的压力也不同。按运动项目选择恢复重点，不用一套程序应付所有训练。"
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col gap-8">
            {scenes.map((scene, i) => (
              <Reveal key={i} delay={i * 100}>
                <div>
                  <h3 className="text-xl font-bold mb-1">{scene.title}</h3>
                  <p className="text-sm text-accent font-medium mb-2">{scene.subtitle}</p>
                  <p className="text-text-secondary leading-relaxed">{scene.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <img
              src={sceneImage.src}
              alt={sceneImage.alt}
              width={1216}
              height={912}
              loading="lazy"
              className="rounded-xl"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
