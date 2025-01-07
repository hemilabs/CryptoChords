export const Transaction = function (props: {
  className?: string;
  id: string;
  color: string;
  type: string;
  message: string;
  at: string;
  url: string;
}) {
  return (
    <div className={`${props.className ?? ''}`}>
      <span style={{ color: props.color }} className="font-bold">
        {props.type}
      </span>
      <span className="text-[#898CA9] ml-1 text-base leading-6">
        {props.message}
        <a className="underline mx-2" href={`${props.url}`} target="_blank">
          <span className="max-md:hidden">`{props.id}`</span>
          <span className="md:hidden">
            `{props.id.slice(0, 6)}...{props.id.slice(-4)}`
          </span>
        </a>
        at {props.at}
      </span>
    </div>
  );
};
