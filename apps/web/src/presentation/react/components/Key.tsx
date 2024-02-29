export interface KeyProps {
  keyShape: string
  x: number
  index: number
  color?: string
}
export const Key = function ({ keyShape, x, index, color}: KeyProps) {
  const isBlack = keyShape === 'black'
  const zIndex = isBlack ? 1 : 0
  const left = `${x * 100}%`
  const top = 0
  const width = isBlack ? '5.4vw' : '8.4vw'

  return (
    <img
      key={index} src={
        color
          ? `/image/keyboard/keys/${color}/${keyShape}.svg`
          : `/image/keyboard/keys/${keyShape}.svg`
        }
      style={{ left, top, width, zIndex }}
      className={`
        absolute
        ${isBlack ? 'translate-x-[-54%]' : 'translate-x-[-50%]'}
      `}
    />
  )
}
