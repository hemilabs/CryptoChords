import { InstrumentEnum } from '../../../domain/enum/InstrumentEnum'
import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository'
import { ObservableService } from '../../ObservableService'
import { StopSoundService } from '../StopSound/StopSoundService'
import { ReleaseKeyRequest as ReleaseKeyRequest } from './ReleaseKeyDtos'

export class ReleaseKeyService extends ObservableService<ReleaseKeyRequest, void>{

  private keyboardRepository: KeyboardRepository
  private stopSound: StopSoundService

  constructor(keyboardRepository: KeyboardRepository, stopSound: StopSoundService) {
    super()
    this.keyboardRepository = keyboardRepository
    this.stopSound = stopSound
  }

  protected async process(request: ReleaseKeyRequest): Promise<void> {
    const keyboard = this.keyboardRepository.getKeyboard()
    if (!keyboard)
      return

    const key = keyboard.findKey(request.pitchClass, request.octave)
    if (!key)
      return

    key.release()
    
    if(!request.instrument) {
      return
    }

    this.stopSound.execute({
      pitchClass: request.pitchClass,
      octave: request.octave,
      instrument: request.instrument as InstrumentEnum
    })
  }
}