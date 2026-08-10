import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">跳转到主要内容</a>
      <Nav />
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
