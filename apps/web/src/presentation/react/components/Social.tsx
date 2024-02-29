import discord from '/image/social/discord.svg'
import twitter from '/image/social/twitter.svg'

export const Social = function (props: {
  className?: string
  large?: boolean
}) {
  return (
    <div className={`${props.className ?? ''} flex flex-row md:gap-10 max-md:gap-7`}>
      <a href="https://discord.gg/RyhaPp7NvQ" target="_blank" className='h-auto'>
        <img src={discord} className={`md:w-10 max-md:w-${props.large ? 16 : 7}`} alt="Crypto Chords Discord" />
      </a>
      <a href="https://twitter.com/hemi_xyz" target="_blank" className='h-auto'>
        <img src={twitter} className={`md:w-10 max-md:w-${props.large ? 16 : 7}`} alt="Crypto Chords Twitter" />
      </a>
    </div>
  )
}
