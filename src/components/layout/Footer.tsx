import { Link } from 'react-router-dom'
import { trustStats, trustTexts } from '../../data/trust'

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[#1a1a1a]">
      <div className="container text-center">
        <p className="text-sm font-bold tracking-widest text-text-primary mb-2">THERATOOLS</p>
        <p className="text-sm text-text-secondary mb-1">源自康复专业临床 · 专研运动恢复科技</p>
        <p className="text-xs text-text-tertiary mt-1">&copy; 2026 Theratools. 隶属于健衡集团。All rights reserved.</p>

        {/* 专业背书：统计 + 信任文案（原 TrustSection 并入） */}
        <div className="mt-10 pt-8 border-t border-[#1a1a1a]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustStats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">
                  {stat.number}
                  <small className="text-sm font-medium text-text-tertiary">{stat.unit}</small>
                </p>
                <p className="text-xs text-text-tertiary">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-1 mt-6">
            {trustTexts.map((text, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed ${
                  i === trustTexts.length - 1 ? 'text-white font-semibold' : 'text-text-secondary'
                }`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-text-secondary" aria-label="页脚导航">
          <a href="#" className="hover:text-white transition-colors">关于我们</a>
          <a href="#" className="hover:text-white transition-colors">专利与认证</a>
          <a href="#" className="hover:text-white transition-colors">操作视频</a>
          <Link to="/faq" className="hover:text-white transition-colors">常见问题</Link>
          <Link to="/training" className="hover:text-white transition-colors">培训合作</Link>
          <a href="#" className="hover:text-white transition-colors">售后支持</a>
          <a href="#" className="hover:text-white transition-colors">全球合作</a>
          <a href="#" className="hover:text-white transition-colors">联系我们</a>
        </nav>

        <div className="flex justify-center gap-8 mt-8">
          <div className="flex flex-col items-center gap-1">
            <img src="/assets/Theratools.png" alt="Theratools 公众号二维码" width="120" height="120" />
            <span className="text-xs text-text-tertiary">官方公众号</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <img src="/assets/jd.png" alt="京东旗舰店二维码" width="120" height="120" />
            <span className="text-xs text-text-tertiary">京东旗舰店</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <img src="/assets/tb.png" alt="淘宝旗舰店二维码" width="120" height="120" />
            <span className="text-xs text-text-tertiary">淘宝旗舰店</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
