import { useEffect, useState } from 'react'
import { PianoPresenter } from '../../common/presenter/piano/PianoPresenter'
import piano from '/image/piano/base.svg'
import { PianoPresenterState } from '../../common/presenter/piano/PianoPresenterState'

const presenter = new PianoPresenter()

export const Piano = function (props: {
  className?: string
}) {

  const [state, setState] = useState<PianoPresenterState>(presenter.state)

  useEffect(() => {
    presenter.subscribe(setState)
  }, [])

  return (
    <div className={`${props.className ?? ''}`}>
      <img src={piano} className={`w-full`} />
      <div className='absolute top-[27%] left-[1%] right-[1%]'>
        {
          state.keys.map(({ keyShape, x }, index) => {
            const isBlack = keyShape === 'black'
            const zIndex = isBlack ? 1 : 0
            const left = `${x * 100}%`
            const top = 0
            const width = isBlack ? '5.4vw' : '8.4vw'

            return (
              <img
                key={index} src={`/image/piano/keys/${keyShape}.svg`}
                style={{ left, top, width, zIndex }}
                className={`
                  absolute
                  ${isBlack ? 'translate-x-[-54%]' : 'translate-x-[-50%]'}
                `}
              />
            )
          })
        }
      </div>
    </div>
  )
}
