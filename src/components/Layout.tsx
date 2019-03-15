import * as React from 'react'
import Sidebar from 'react-sidebar'
import SidebarContent from './Sidebar'
import Header from './Header'
import colors from '../constants/colors'
import { SIDEBAR_WIDTH } from '../constants/size'

// override react-sidebar style
const sidebarStyle = {
  sidebar: {
    backgroundColor: colors.BG_INVERSE,
    color: colors.TEXT_INVERSE
  }
}

const Layout = ({ children }) => (
  <div className="container">
    <Sidebar
      sidebar={<SidebarContent />}
      styles={sidebarStyle}
      defaultSidebarWidth={SIDEBAR_WIDTH}
      shadow={false}
      open
      docked
    >
      <Header />
      <main className="body">{children}</main>
    </Sidebar>
    <style jsx>{``}</style>
  </div>
)

export default Layout
