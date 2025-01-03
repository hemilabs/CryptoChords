type Props = {
  items: { id: string; content: React.ReactNode }[];
};

export const Menu = ({ items }: Props) => (
  <div className="rounded-lg border border-solid border-neutral-300/55 bg-white p-1 text-sm shadow-md">
    <ul className="flex flex-col gap-y-1">
      {items.map(({ content, id }) => (
        <li
          className="group/menu-item w-full cursor-pointer rounded px-2 py-1 text-slate-500 hover:bg-neutral-50 hover:text-neutral-950"
          key={id}
        >
          {content}
        </li>
      ))}
    </ul>
  </div>
);
