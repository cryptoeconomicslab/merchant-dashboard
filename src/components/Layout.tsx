import * as React from 'react'
import Sidebar from 'react-sidebar'
import SidebarContent from './Sidebar'
import colors from '../constants/colors'
import { SIDEBAR_WIDTH, PADDING } from '../constants/size'

// override react-sidebar style
const sidebarStyle = {
  sidebar: {
    backgroundColor: colors.BG_MAIN,
    color: colors.TEXT_MAIN
  }
}

const Layout = ({ children }) => (
  <div className="container">
    <Sidebar
      sidebar={<SidebarContent />}
      styles={sidebarStyle}
      defaultSidebarWidth={SIDEBAR_WIDTH}
      shadow
      open
      docked
    >
      <main className="body">{children}</main>
    </Sidebar>
    <style jsx>{`
      .body {
        padding: 0 ${PADDING.MEDIUM};
      }
    `}</style>
  </div>
)

export default Layout
