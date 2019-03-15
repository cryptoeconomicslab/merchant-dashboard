import * as React from 'react'
import Sidebar from 'react-sidebar'
import SidebarContent from './Sidebar'
import Header from './Header'
import colors from '../constants/colors'
import { SIDEBAR_WIDTH, PADDING } from '../constants/size'

// override react-sidebar style
const sidebarStyle = {
  sidebar: {
    backgroundColor: colors.BG_MAIN,
    color: colors.TEXT_MAIN
  }
}

const Layout = ({ children, title }) => (
  <div className="container">
    <Sidebar
      sidebar={<SidebarContent />}
      styles={sidebarStyle}
      defaultSidebarWidth={SIDEBAR_WIDTH}
      shadow
      open
      docked
    >
      <Header title={title} />
      <main className="body">{children}</main>
    </Sidebar>
    <style jsx>{`
      .body {
        padding: ${PADDING.MEDIUM};
      }
    `}</style>
  </div>
)

export default Layout
