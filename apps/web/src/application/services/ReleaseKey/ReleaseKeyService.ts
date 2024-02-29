import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository'
import { ObservableService } from '../../ObservableService'
import { ReleaseKeyRequest as ReleaseKeyRequest } from './ReleaseKeyDtos'

export class ReleaseKeyService extends ObservableService<ReleaseKeyRequest, void>{

  private keyboardRepository: KeyboardRepository

  constructor(keyboardRepository: KeyboardRepository) {
    super()
    this.keyboardRepository = keyboardRepository
  }

  protected async process(request: ReleaseKeyRequest): Promise<void> {
    const keyboard = this.keyboardRepository.getKeyboard()
    if (!keyboard)
      return

    const key = keyboard.findKey(request.pitchKey, request.octave)
    if (!key)
      return

    key.release()
  }
}