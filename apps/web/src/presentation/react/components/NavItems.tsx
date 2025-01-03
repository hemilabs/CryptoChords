import { NavItem } from './NavItem';

export const NavItems = function (props: { className?: string }) {
  return (
    <nav className={`flex flex-row gap-8 ${props.className ?? ''}`}>
      <NavItem href={import.meta.env.VITE_GITHUB_URL}>Github</NavItem>
      <NavItem href={import.meta.env.VITE_CONTRIBUTORS_URL}>Contribute</NavItem>
      <NavItem href={import.meta.env.VITE_FEEDBACK_URL}>Feedback</NavItem>
    </nav>
  );
};
