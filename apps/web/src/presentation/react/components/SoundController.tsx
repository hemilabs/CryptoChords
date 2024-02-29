export const SoundController = function (props: {
  className?: string
}) {
  return (
    <div className={`${props.className ?? ''}`}>
      <span className='md:size-8 max-md:size-7 font-extrabold'>Sound</span>
      <input type="checkbox" className='mx-6' />
      <select className=''>
        <option value="keyboard">Harmony</option>
        <option value="keyboard">Keyboard</option>
        <option value="keyboard">Electronic</option>
        <option value="keyboard">Organ</option>
      </select>
    </div>
  )
}
