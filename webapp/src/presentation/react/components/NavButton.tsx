import navButton from '/image/nav-button.svg'
export const NavButton = function (props: {
  className?: string
  onClick?: () => void
}) {
  return (
    <img src={navButton} className={`cursor-pointer w-10 ${props.className ?? ''}`} onClick={props.onClick} />
  )
}
