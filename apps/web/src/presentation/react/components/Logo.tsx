import logo from '/image/crypto-chords.svg'

export const Logo = function () {
  const url = import.meta.env.VITE_LOGO_URL
  return (
    <a 
      href={url ?? '#'}
      target={url ? '_blank' : '_self'}
      className={`
        h-auto
        ${url ? 'pointer' : 'cursor-default'}
      `}>
      <img src={logo} alt="Crypto Chords" />
    </a>
  )
}
