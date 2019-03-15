import * as React from 'react'
import { SIDEBAR_WIDTH } from '../constants/size'

const SidebarItem = ({ children }) => {
  return (
    <li>
      {children}
      <style jsx>{`
        li {
        }
      `}</style>
    </li>
  )
}

const SidebarContent = () => {
  return (
    <ul>
      <SidebarItem>1</SidebarItem>
      <SidebarItem>2</SidebarItem>
      <SidebarItem>3</SidebarItem>
      <SidebarItem>4</SidebarItem>
      <style jsx>{`
        ul {
          width: ${SIDEBAR_WIDTH}px;
        }
      `}</style>
    </ul>
  )
}

export default SidebarContent
