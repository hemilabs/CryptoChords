import { useState } from 'react'
import navButton from '/image/nav-button.svg'
import { Nav } from './Nav'
export const NavButton = function (props: {
  className?: string
  onClick?: () => void
}) {

  const [expanded, setExpanded] = useState(false)

  return expanded ? (
    <Nav />
  ) : (
    <img src={navButton} className={`w-10 ${props.className ?? ''}`}  onClick={() => setExpanded(!expanded)} />
  )
}
