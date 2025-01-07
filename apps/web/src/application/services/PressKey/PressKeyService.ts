import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository';
import { ObservableService } from '../../ObservableService';
import { PlaySoundService } from '../PlaySound/PlaySoundService';
import { PressKeyRequest, PressKeyResponse } from './PressKeyDtos';

export class PressKeyService extends ObservableService<
  PressKeyRequest,
  PressKeyResponse
> {
  private keyboardRepository: KeyboardRepository;
  private playSound: PlaySoundService;

  constructor(
    keyboardRepository: KeyboardRepository,
    playSound: PlaySoundService,
  ) {
    super();
    this.keyboardRepository = keyboardRepository;
    this.playSound = playSound;
  }

  protected async process(request: PressKeyRequest): Promise<PressKeyResponse> {
    const keyboard = this.keyboardRepository.getKeyboard();
    if (!keyboard) return {};

    const key = keyboard.findKey(request.pitchClass, request.octave);
    if (!key) return {};

    key.press();

    const { instrument } = await this.playSound.execute({
      octave: request.octave,
      pitchClass: request.pitchClass,
    });

    return { instrument };
  }
}
