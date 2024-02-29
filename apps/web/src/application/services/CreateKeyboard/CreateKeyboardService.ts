import { PitchClassEnum } from '../../../domain/enum/PitchClassEnum'
import { KeyboardFactory } from '../../../domain/factories/KeyboardFactory'
import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository'
import { ObservableService } from '../../ObservableService'
import { CreateKeyboardRequestDto, CreateKeyboardResponseDto } from './CreateKeyboardDtos'

export class CreateKeyboardService extends ObservableService<CreateKeyboardRequestDto, CreateKeyboardResponseDto>{
  private keyboardRepository: KeyboardRepository

  constructor(keyboardRepository: KeyboardRepository) {
    super()
    this.keyboardRepository = keyboardRepository
  }

  protected async process(request: CreateKeyboardRequestDto): Promise<CreateKeyboardResponseDto> {
    const keyboard = KeyboardFactory.create({
      initialOctave: request.initialOctave,
      numberOfKeys: request.numberOfKeys,
      initialPitchClass: request.initialPitchClass as PitchClassEnum
    })

    this.keyboardRepository.setKeyboard(keyboard)

    return {
      keys: keyboard.keys.map(key => ({
        pitch: {
          class: key.pitch.pitchClass.value,
          octave: key.pitch.octave
        },
        keyShape: key.keyShape.value,
        x: key.x.value,
        color: key.color
      }))
    }
  }
}