export const Card = function (props: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={`${props.className ?? ''} bg-[#1A1B23] max-md:rounded-md md:rounded-2xl md:p-10 max-md:p-3`}>
      {props.children}
    </div>
  )
}
