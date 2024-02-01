import { JoinCommunityButton } from './JoinCommunityButton'
import { Logo } from './Logo'
import { NavItems } from './NavItems'
import { Social } from './Social'
import closeButton from '/image/close-button.svg'

export const NavMenu = function (props: {
  className?: string
  onCloseButtonClick?: () => void
}) {
  return (
    <div className={`
      ${props.className}
      fixed w-full
      flex flex-col justify-between
      bottom-0 left-0 right-0 top-0
      bg-black
      overflow-y-auto
      pb-16
      z-50
      `}>
      <div className='flex flex-row justify-between p-10'>
        <Logo />
        <img src={closeButton} onClick={props.onCloseButtonClick} className={`cursor-pointer w-10 ${props.className ?? ''}`} />
      </div>
      <NavItems className='flex-col mt-24 text-center gap-24 text-4xl'></NavItems>
      <div className='grow flex flex-col justify-center my-16'>
        <JoinCommunityButton className='mx-auto text-2xl p-8' />
      </div>
      <Social large className='justify-center'></Social>
    </div>
  )
}
