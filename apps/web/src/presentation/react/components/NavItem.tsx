export const NavItem = function (options: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={options.href}
      target="_blank"
      className="leading-4 h-4 my-auto mx-0"
    >
      {options.children}
    </a>
  );
};
