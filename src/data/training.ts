import type { TrainingCard } from '../types'

export const trainingCards: TrainingCard[] = [
  {
    iconSvg: 'monitor',
    title: '线下实训营',
    description:
      '面向康复机构、运动队和专业团队。课程包括空气压力波操作规范、运动场景程序、联合恢复流程和门店项目落地。',
    bullets: [
      '三甲康复医师授课',
      '结业颁发认证证书',
      '终身免费复训',
    ],
  },
  {
    iconSvg: 'book',
    title: '线上认证课程',
    description:
      '面向康复师、教练及专业个人用户。课程包括技术发展、基础解剖、参数选择、使用禁忌和居家实操。',
    bullets: [
      '模块化课程体系',
      '电子版操作手册',
      '标准化理疗方案模板',
    ],
  },
  {
    iconSvg: 'clipboard',
    title: '标准方案库',
    description:
      '涵盖跑步赛后恢复、力量训练后恢复、球类运动连续比赛、专业机构标准服务流程等方案，可直接下载使用。',
    bullets: [
      '跑步赛后恢复方案',
      '力量训练后恢复方案',
      '专业机构服务流程',
    ],
  },
]
