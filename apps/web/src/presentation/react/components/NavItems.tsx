import { NavItem } from './NavItem';
import { githubUrl } from 'hemi-socials';

export const NavItems = function (props: { className?: string }) {
  return (
    <nav className={`flex flex-row gap-8 ${props.className ?? ''}`}>
      <NavItem href={`${githubUrl}/CryptoChords`}>Github</NavItem>
      <NavItem href={`${githubUrl}/CryptoChords/blob/master/CONTRIBUTING.md`}>
        Contribute
      </NavItem>
      <NavItem href={`${githubUrl}/CryptoChords/issues/new`}>Feedback</NavItem>
    </nav>
  );
};
