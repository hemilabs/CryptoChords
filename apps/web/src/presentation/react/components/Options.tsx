import { useContext, useEffect } from 'react';
import { usePresenter } from '../hooks/usePresenter';
import { presenters } from '../context';
import { OptionsPresenter } from '../../common/presenter/options/OptionsPresenter';
import { OptionsPresenterState } from '../../common/presenter/options/OptionsPresenterState';
import { Checkbox } from './Checkbox';
import { Select } from './Select';

export const Options = function (props: { className?: string }) {
  const { optionsPresenter } = useContext(presenters);
  const {
    muted,
    instruments,
    selectedInstrument,
    displayLoadingMessage,
    displayInstrumentPicker,
  } = usePresenter<OptionsPresenter, OptionsPresenterState>(optionsPresenter);

  /**
   * Since the browser will not allow sound to be played without user interaction,
   * we will mute the sound by default.
   */
  useEffect(() => {
    optionsPresenter.setMuted(true);
  }, [optionsPresenter]);

  return (
    <div
      className={`
      ${props.className ?? ''}
      inline-flex
      vertical-middle
      w-full
    `}
    >
      <span className="my-auto md:text-2xl max-md:text-xl flex-grow font-extrabold">
        Sound
      </span>
      <Checkbox
        className="mx-6 my-auto"
        value={!muted}
        onClick={() => optionsPresenter.setMuted(!muted)}
      />
      {displayLoadingMessage && <span>Loading instrument sounds...</span>}
      {displayInstrumentPicker && (
        <Select
          className="min-w-40"
          value={selectedInstrument}
          onChange={value => value && optionsPresenter.setInstrument(value)}
          options={instruments}
        />
      )}
    </div>
  );
};
