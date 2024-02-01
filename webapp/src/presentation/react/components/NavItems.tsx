import { NavItem } from './NavItem'

export const NavItems = function (props: {
  className?: string
}) {
  return (
    <nav className={`flex flex-row gap-8 ${props.className ?? ''}`}>
      <NavItem href="http://github.com">Github</NavItem>
      <NavItem href="/">Contribute</NavItem>
      <NavItem href="/">Feedback</NavItem>
    </nav>
  )
}
