import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import ScrollProgress from '../ui/ScrollProgress'
import CustomCursor from '../ui/CustomCursor'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />
      <ScrollProgress />
      <a className="skip-link" href="#main">跳转到主要内容</a>
      <Nav />
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
