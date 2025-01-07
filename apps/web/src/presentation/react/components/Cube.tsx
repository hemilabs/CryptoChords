export const Cube = function (props: {
  className?: string;
  style?: React.CSSProperties;
  centerPositioning?: boolean;
  color: string;
  mirrored?: boolean;
}) {
  return (
    <img
      src={`/image/cube/${props.color}.png`}
      className={`absolute 
                  bottom-0
                  w-[10vw]
                  h-[10vw]
                  ${props.mirrored === true ? 'scale-x-[-1]' : ''}
                  ${props.className ?? ''}
                  ${props.centerPositioning === false ? '' : 'translate-x-[-50%] translate-y-[50%]'}
                `}
      style={props.style}
    />
  );
};
