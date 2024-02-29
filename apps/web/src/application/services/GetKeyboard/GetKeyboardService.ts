import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository'
import { ObservableService } from '../../ObservableService'
import { GetKeyboardResponseDto } from './GetKeyboardDtos'

export class GetKeyboardService extends ObservableService<void, GetKeyboardResponseDto>{
  private readonly keyboardRepository: KeyboardRepository
  
  constructor(keyboardRepository: KeyboardRepository) {
    super()
    this.keyboardRepository = keyboardRepository
  }

  protected async process(): Promise<GetKeyboardResponseDto> {
    const keyboard = this.keyboardRepository.getKeyboard()

    if (!keyboard) {
      return {
        keys: []
      }
    }

    return {
      keys: keyboard.keys.map(key => ({
        pitch: {
          class: key.pitch.pitchClass.value,
          octave: key.pitch.octave
        },
        keyShape: key.keyShape.value,
        x: key.x.value,
        color: key.color,
        pressed: key.pressed
      }))
    }
  }
}