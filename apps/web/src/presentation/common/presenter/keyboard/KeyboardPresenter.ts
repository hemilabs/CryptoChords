import { Event, Observable } from '@cryptochords/shared'
import { CreateKeyboardService } from '../../../../application/services/CreateKeyboard/CreateKeyboardService'
import { GetKeyboardService } from '../../../../application/services/GetKeyboard/GetKeyboardService'
import { Presenter } from '../../base/Presenter'
import { KeyboardPresenterState } from './KeyboardPresenterState'

const initalState: KeyboardPresenterState = {
  keys: []
}

interface KeyboardPresenterOptions {
  numberOfKeys: number
  initialPitchClass: string
  initialOctave: number
}

const defaultOptions: KeyboardPresenterOptions = {
  numberOfKeys: 88,
  initialPitchClass: 'A',
  initialOctave: 0
}

export class KeyboardPresenter extends Presenter<KeyboardPresenterState> {

  private options: KeyboardPresenterOptions
  private createKeyboardService: CreateKeyboardService
  private getKeyboardService: GetKeyboardService

  constructor(
    createKeyboardService: CreateKeyboardService,
    getKeyboardService: GetKeyboardService,
    keyboardChangesObserver?: Observable<Event>,
    options?: Partial<KeyboardPresenterOptions>
  ) {
    super(initalState)

    this.createKeyboardService = createKeyboardService
    this.getKeyboardService = getKeyboardService

    this.options = {
      ...defaultOptions,
      ...options
    }

    this.createKeyboard()
    this.refresh()

    if(keyboardChangesObserver) {
      keyboardChangesObserver.listen(this.refresh.bind(this))
    }
  }

  async refresh() {
    const keyboard = await this.getKeyboardService.execute()

    if (!keyboard) {
      return
    }

    this.changeState({
      keys: keyboard.keys.map(key => ({
        pitch: {
          class: key.pitch.class,
          octave: key.pitch.octave
        },
        keyShape: key.keyShape,
        x: key.x,
        color: key.pressed ? key.color : undefined
      }))
    })
  }

  private async createKeyboard() {
    await this.createKeyboardService.execute({
      numberOfKeys: this.options.numberOfKeys,
      initialPitchClass: this.options.initialPitchClass,
      initialOctave: this.options.initialOctave
    })
  }

}
