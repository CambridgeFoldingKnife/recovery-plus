import type { HeroData } from '../types'

export const heroData: HeroData = {
  label: 'Theratools 空气压力波运动恢复设备',
  title: '练完就恢复，\n明天不耽误。',
  lede: '源自康复专业临床 · 专研运动恢复科技',
  desc: '你拼尽全力的训练，值得一次专业级的恢复。',
  pills: [
    { text: '4 腔独立气囊' },
    { text: '梯度气压程序' },
    { text: '15 分钟自动运行' },
    { text: '≤42dB 静音设计' },
    { text: '折叠装入随身小包' },
  ],
  primaryCta: {
    text: '查看空气压力波产品',
    href: 'https://theratools.tmall.com/category.htm?spm=pc_detail.30350276.shop_block.dshopinfo.1bb47dd69PnjDH',
  },
  secondaryCta: {
    text: '选择我的恢复场景',
    href: '#scenes',
  },
}

export const productInsight = {
  imageSrc: '/assets/002.jpg',
  title: 'Theratools气压恢复靴',
  subtitle: '让专业级的恢复，不再只属于明星运动员。',
  descriptions: [
    '真正打乱训练计划的，往往不是训练时的累，而是训练后迟迟散不去的沉、紧和胀。',
    '跑者担心下一次配速掉下来；练腿的人担心第二天上下楼；连续比赛的人，没有一整天慢慢等身体恢复。',
  ],
  emphasis: '恢复不是练完后的奖励。\n它是训练计划的下一项。',
}
