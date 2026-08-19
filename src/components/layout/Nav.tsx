import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useStickyNav } from '../../hooks/useStickyNav'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import Button from '../ui/Button'

const HOME_SECTION_IDS = ['top', 'technology', 'products', 'scenes']

export default function Nav() {
  const isScrolled = useStickyNav()
  const activeId = useScrollSpy(HOME_SECTION_IDS)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (!isHome) {
      e.preventDefault()
      navigate('/', { state: { scrollTo: sectionId } })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-med ${
        isScrolled
          ? 'bg-bg-primary/95 border-b border-[#1a1a1a] shadow-sm'
          : 'bg-bg-primary/86 backdrop-blur-xl border-b border-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <NavLink to="/" className="shrink-0 flex items-center" aria-label="Theratools 首页">
          <img src="/assets/threatools_logo.png" alt="Theratools" style={{ height: '120px', width: 'auto' }} />
        </NavLink>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2" aria-label="主导航">
          <a
            href="/#technology"
            onClick={(e) => handleHashClick(e, 'technology')}
            className={`relative text-sm py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all after:duration-200 ${
              isHome && activeId === 'technology'
                ? 'text-white after:w-full'
                : 'text-text-secondary hover:text-white after:w-0 hover:after:w-full'
            }`}
          >
            空气压力波技术
          </a>
          <a
            href="/#scenes"
            onClick={(e) => handleHashClick(e, 'scenes')}
            className={`relative text-sm py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all after:duration-200 ${
              isHome && activeId === 'scenes'
                ? 'text-white after:w-full'
                : 'text-text-secondary hover:text-white after:w-0 hover:after:w-full'
            }`}
          >
            运动恢复场景
          </a>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              `relative text-sm py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all after:duration-200 ${
                isActive ? 'text-white after:w-full' : 'text-text-secondary hover:text-white after:w-0 hover:after:w-full'
              }`
            }
          >
            产品说明
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `relative text-sm py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all after:duration-200 ${
                isActive ? 'text-white after:w-full' : 'text-text-secondary hover:text-white after:w-0 hover:after:w-full'
              }`
            }
          >
            常见问题
          </NavLink>
        </nav>

        {/* CTA button, NO mobile menu */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            href="https://theratools.tmall.com/category.htm?spm=pc_detail.30350276.shop_block.dshopinfo.1bb47dd69PnjDH"
          >
            查看产品
          </Button>
        </div>
      </div>
    </header>
  )
}
