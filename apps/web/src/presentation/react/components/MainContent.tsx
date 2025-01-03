import { Card } from './Card';
import { Cubes } from './Cubes';
import { Keyboard } from './Keyboard';
import { Social } from './Social';
import { Options } from './Options';
import { Transactions } from './Transactions';
import desktopBackground from '/image/background/desktop.svg';
import mobileBackground from '/image/background/mobile.svg';

// This constant is used to multiply the y position of the cubes
// to allow the cubes extrapolate the top of the component
const CUBES_Y_MULTIPLIER = 2;
// This constant is used to offset the cubes from the bottom of the component
// to hide the creation of the cubes avoiding a visual glitch
const CUBES_BOTTOM_OFFSET = 0.15;

export function MainContent(props: { className: string }) {
  return (
    <main className={`grow text-white pb-20 ${props.className ?? ''}`}>
      <img
        src={mobileBackground}
        className="sm:hidden w-full absolute pointer-events-none"
      />
      <img
        src={desktopBackground}
        className="max-sm:hidden w-full absolute pointer-events-none"
      />
      <div className="relative w-[78.34vw] mx-auto">
        <Cubes
          className="relative w-[96%] mx-auto h-[25vw] mb-0"
          yMultiplier={CUBES_Y_MULTIPLIER}
          bottomOffset={CUBES_BOTTOM_OFFSET}
        />
        <Keyboard className="relative w-[97.88%] mx-auto z-10" />
        <div className="flex max-lg:flex-col lg:flex-row lg:gap-4 justify-between lg:mt-24 max-lg:mt-8">
          <Card className="lg:basis-[30%] lg:grow-0 max-lg:mb-5 lg:mb-auto">
            <Options />
          </Card>
          <Card className="lg:basis-[67.88%] grow-0 break-words overflow-hidden">
            <Transactions />
          </Card>
        </div>
        <Social className="mt-8 lg:justify-end max-lg:justify-center" />
      </div>
    </main>
  );
}
