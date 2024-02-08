import { CreateKeyboardService } from '../../../../application/CreateKeyboard/CreateKeyboardService'
import { Presenter } from '../../base/Presenter'
import { PianoPresenterState } from './PianoPresenterState'

const initalState: PianoPresenterState = {
  keys: []
}

interface PianoPresenterOptions {
  numberOfKeys: number
  initialPitchClass: string
  initialOctave: number
}

const defaultOptions: PianoPresenterOptions = {
  numberOfKeys: 88,
  initialPitchClass: 'A',
  initialOctave: 1
}

export class PianoPresenter extends Presenter<PianoPresenterState> {

  private options: PianoPresenterOptions

  constructor(
    options?: Partial<PianoPresenterOptions>
  ) {
    super(initalState)
    this.options = {
      ...defaultOptions,
      ...options
    }

    this.createKeys()
  }

  private async createKeys() {
    const keyboard = await new CreateKeyboardService().execute({
      numberOfKeys: this.options.numberOfKeys,
      initialPitchClass: this.options.initialPitchClass,
      initialOctave: this.options.initialOctave
    })
    this.changeState({
      keys: keyboard.keys.map(key => ({
        pitch: {
          class: key.pitch.class,
          octave: key.pitch.octave
        },
        keyShape: key.keyShape,
        x: key.x
      }))
    })
  }

}
