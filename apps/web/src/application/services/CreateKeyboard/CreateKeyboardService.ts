import { PitchClassEnum } from '../../../domain/enum/PitchClassEnum';
import { KeyboardFactory } from '../../../domain/factories/KeyboardFactory';
import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository';
import { ObservableService } from '../../ObservableService';
import {
  CreateKeyboardRequestDto,
  CreateKeyboardResponseDto,
} from './CreateKeyboardDtos';

export class CreateKeyboardService extends ObservableService<
  CreateKeyboardRequestDto,
  CreateKeyboardResponseDto
> {
  private keyboardRepository: KeyboardRepository;

  constructor(keyboardRepository: KeyboardRepository) {
    super();
    this.keyboardRepository = keyboardRepository;
  }

  protected async process(
    request: CreateKeyboardRequestDto,
  ): Promise<CreateKeyboardResponseDto> {
    const keyboard = KeyboardFactory.create({
      initialOctave: request.initialOctave,
      initialPitchClass: request.initialPitchClass as PitchClassEnum,
      numberOfKeys: request.numberOfKeys,
    });

    this.keyboardRepository.setKeyboard(keyboard);

    return {
      keys: keyboard.keys.map(key => ({
        color: key.color,
        keyShape: key.keyShape.value,
        pitch: {
          class: key.pitch.pitchClass.value,
          octave: key.pitch.octave,
        },
        x: key.x.value,
      })),
    };
  }
}
