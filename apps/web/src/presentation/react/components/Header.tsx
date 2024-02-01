import { JoinCommunityButton } from './JoinCommunityButton'
import { Logo } from './Logo'
import { NavButton } from './NavButton'
import { NavItems } from './NavItems'

export const Header = (props: {
  className?: string
  onNavButtonClick?: () => void
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
      <NavItems className='max-md:hidden' />
      <JoinCommunityButton className='max-md:hidden'/>
      <NavButton className='md:hidden' onClick={props.onNavButtonClick}/>
    </header>
  )
}