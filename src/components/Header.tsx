import * as React from 'react'
import { FONT_SIZE } from '../constants/size'

const Header = ({ title }) => {
  return (
    <header>
      <h1 className="title">{title}</h1>
      <style jsx>{`
        header {
          height: 60px;
          display: flex;
          padding: 0 1.6rem;
          align-items: center;
        }
        .title {
          text-transform: uppercase;
          font-size: ${FONT_SIZE.SEMI_LARGE};
        }
      `}</style>
    </header>
  )
}

export default Header
