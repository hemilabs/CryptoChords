import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository'
import { ObservableService } from '../../ObservableService'
import { PressKeyRequest } from './PressKeyDtos'

export class PressKeyService extends ObservableService<PressKeyRequest, void>{

  private keyboardRepository: KeyboardRepository

  constructor(keyboardRepository: KeyboardRepository) {
    super()
    this.keyboardRepository = keyboardRepository
  }

  protected async process(request: PressKeyRequest): Promise<void> {
    const keyboard = this.keyboardRepository.getKeyboard()
    if (!keyboard)
      return

    const key = keyboard.findKey(request.pitchKey, request.octave)
    if (!key)
      return

    key.press()
  }
}