import * as React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { FaCheck, FaMoneyBill, FaCog } from 'react-icons/fa'
import { SIDEBAR_WIDTH } from '../constants/size'
import colors from '../constants/colors'

const SidebarItem = ({ href, children }) => {
  return (
    <li>
      <Link href={href}>
        <a>{children}</a>
      </Link>
      <style jsx>{`
        li {
          width: 100%;
          height: 4.8rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          transition: opacity 0.1s linear;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </li>
  )
}

const SidebarContent = ({ router }) => {
  const path = router.pathname

  return (
    <ul>
      <SidebarItem href="/">
        <FaCheck size={30} color={path === '/' ? colors.COLOR_PRIMARY : ''} />
      </SidebarItem>
      <SidebarItem href="/Transactions">
        <FaMoneyBill
          size={30}
          color={path === '/Transactions' ? colors.COLOR_PRIMARY : ''}
        />
      </SidebarItem>
      <SidebarItem href="/Config">
        <FaCog
          size={30}
          color={path === '/Config' ? colors.COLOR_PRIMARY : ''}
        />
      </SidebarItem>
      <style jsx>{`
        ul {
          width: ${SIDEBAR_WIDTH}px;
        }
      `}</style>
    </ul>
  )
}

export default withRouter(SidebarContent)
