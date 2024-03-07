import { useContext, useEffect } from 'react'
import { usePresenter } from '../hooks/usePresenter'
import { presenters } from '../context'
import { OptionsPresenter } from '../../common/presenter/options/OptionsPresenter'
import { OptionsPresenterState } from '../../common/presenter/options/OptionsPresenterState'

export const SoundController = function (props: {
  className?: string
}) {
  const { optionsPresenter } = useContext(presenters)
  const { muted, instruments, selectedInstrument, displayLoadingMessage, displayInstrumentPicker } = usePresenter<OptionsPresenter, OptionsPresenterState>(optionsPresenter)

  /**
   * Since the browser will not allow sound to be played without user interaction,
   * we will mute the sound by default.
   */
  useEffect(() => {
    optionsPresenter.setMuted(true)
  }, [optionsPresenter])

  return (
    <div className={`${props.className ?? ''}`}>
      <span className='md:size-8 max-md:size-7 font-extrabold'>Sound</span>
      <input type="checkbox" className='mx-6' checked={!muted} onChange={(e) => optionsPresenter.setMuted(!e.target.checked)} />
      {
        displayLoadingMessage
          ? <span>Loading instrument sounds...</span>
          : <></>
      }
      {
        displayInstrumentPicker
          ? <select
            value={selectedInstrument}
            onChange={(e) => optionsPresenter.setInstrument(e.target.value)}>
            {instruments.map(instrument =>
              <option
                key={instrument.id}
                value={instrument.id}
              >
                {instrument.name}
              </option>
            )}
          </select>
          : <></>
      }

    </div>
  )
}
