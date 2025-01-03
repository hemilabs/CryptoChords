import { useContext } from 'react';
import { KeyboardPresenter } from '../../common/presenter/keyboard/KeyboardPresenter';
import { KeyboardPresenterState } from '../../common/presenter/keyboard/KeyboardPresenterState';
import { presenters } from '../context';
import { usePresenter } from '../hooks/usePresenter';
import { Key } from './Key';
import keyboard from '/image/keyboard/base.svg';

export const Keyboard = function (props: { className?: string }) {
  const { keyboardPresenter } = useContext(presenters);
  const { keys } = usePresenter<KeyboardPresenter, KeyboardPresenterState>(
    keyboardPresenter,
  );

  return (
    <div className={`${props.className ?? ''}`}>
      <img src={keyboard} className={`w-full`} />
      <div className="absolute top-[27%] left-[1%] right-[1%]">
        {keys.map(({ keyShape, x, color, pitch }, index) => (
          <Key
            key={`${pitch.class}${pitch.octave}`}
            keyShape={keyShape}
            x={x}
            index={index}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};
