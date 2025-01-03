import { JoinCommunityButton } from './JoinCommunityButton';
import { Logo } from './Logo';
import { NavButton } from './NavButton';
import { NavItems } from './NavItems';
import { NetworkSwitch } from './NetworkSwitch';

export const Header = (props: {
  className?: string;
  onNavButtonClick?: () => void;
  networks: string[];
  selectedNetwork: string | null;
  selectNetwork: (networkName: string) => void;
  enableMainnet: boolean;
}) => {
  return (
    <header
      className={`
        w-full
        flex
        items-center
        justify-between
        m-0
        p-10
        bg-black
        bg-opacity-90
        ${props.className ?? ''}
      `}
    >
      <div className="flex-shrink-0">
        <Logo />
      </div>
      <div className="flex-grow flex justify-center">
        <NavItems className="max-md:hidden" />
      </div>
      <div className="flex items-center gap-4 flex-shrink-0 max-md:hidden">
        {props.enableMainnet && (
          <NetworkSwitch
            networks={props.networks}
            selectedNetwork={props.selectedNetwork ?? props.networks[0]}
            selectNetwork={props.selectNetwork}
          />
        )}
        <JoinCommunityButton />
      </div>
      <NavButton className="md:hidden ml-4" onClick={props.onNavButtonClick} />
    </header>
  );
};
