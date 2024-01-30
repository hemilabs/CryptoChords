import { Logo } from './Logo'
import { Nav } from './Nav'
import { NavButton } from './NavButton'

export const Header = (props: {
  className?: string
}) => {
  return (
    <header className={`
        w-full
        flex
        flex-row
        justify-between
        m-0
        p-10
        bg-black
        bg-opacity-90
        ${props.className ?? ''}`}
    >
      <Logo />
      <Nav className='max-md:hidden' />
      <button className='max-md:hidden'>Join Community</button>
      <NavButton className='md:hidden' />
    </header>
  )
}