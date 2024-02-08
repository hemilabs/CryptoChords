import { PitchClassEnum } from '../../domain/enum/PitchClassEnum'
import { KeyboardFactory } from '../../domain/factories/KeyboardFactory'
import { CreateKeyboardRequestDto, CreateKeyboardResponseDto } from './CreateKeyboardDtos'

export class CreateKeyboardService {
  
  constructor() {
    //
  }

  async execute(request: CreateKeyboardRequestDto): Promise<CreateKeyboardResponseDto> {
    const keyboard = KeyboardFactory.create({
      initialOctave: request.initialOctave,
      numberOfKeys: request.numberOfKeys,
      initialPitchClass: request.initialPitchClass as PitchClassEnum
    })

    return {
      keys: keyboard.keys.map(key => ({
        pitch: {
          class: key.pitch.class.value,
          octave: key.pitch.octave
        },
        keyShape: key.keyShape.value,
        x: key.x.value
      }))
    }
  }
}