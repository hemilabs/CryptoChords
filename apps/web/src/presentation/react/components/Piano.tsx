import piano from '/image/piano/base.svg'

export const Piano = function (props: {
  className?: string
}) {
  return (
    <img src={piano} className={`${props.className ?? ''}`}/>
  )
}
