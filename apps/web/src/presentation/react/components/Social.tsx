import linkedin from '/image/social/linkedin.svg'
import twitter from '/image/social/twitter.svg'

export const Social = function (props: {
  className?: string
  large?: boolean
}) {
  return (
    <div className={`${props.className ?? ''} flex flex-row md:gap-10 max-md:gap-7`}>
      <a href="https://linkedin.com" target="_blank" className='h-auto'>
        <img src={linkedin} className={`md:w-10 max-md:w-${props.large ? 16 : 7}`} alt="Crypto Chords Linkedin" />
      </a>
      <a href="https://twitter.com" target="_blank" className='h-auto'>
        <img src={twitter} className={`md:w-10 max-md:w-${props.large ? 16 : 7}`} alt="Crypto Chords twitter" />
      </a>
    </div>
  )
}
