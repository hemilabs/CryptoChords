export const SoundController = function (props: {
  className?: string
}) {
  return (
    <div className={`${props.className ?? ''}`}>
      <span className='md:size-8 max-md:size-7 font-extrabold'>Sound</span>
      <input type="checkbox" className='mx-6' />
      <select className=''>
        <option value="piano">Harmony</option>
        <option value="piano">Piano</option>
        <option value="piano">Electronic</option>
        <option value="piano">Organ</option>
      </select>
    </div>
  )
}
