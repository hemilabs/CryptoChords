import { describe, expect, it } from 'vitest'
import { PianoPresenter } from './PianoPresenter'

const pianoPresenter = new PianoPresenter({
  numberOfKeys: 88,
  initialPitchClass: 'A',
  initialOctave: 1
})

describe('src/presentation/common/presenter/piano/PianoPresenter', () => {
  it('should be defined', () => {
    expect(pianoPresenter).toBeDefined()
  })

  it('should have 88 keys', () => {
    expect(pianoPresenter.state.keys.length).toBe(88)
  })

})