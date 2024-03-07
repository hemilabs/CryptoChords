import { PitchClassEnum } from '../../../domain/enum/PitchClassEnum'
import { SoundService } from '../../../domain/services/SoundService'
import { PitchClass } from '../../../domain/valueObjects/PitchClass'
import { ObservableService } from '../../ObservableService'
import { StopSoundRequest } from './StopSoundDtos'

export class StopSoundService extends ObservableService<StopSoundRequest, void>{

  private soundService: SoundService

  constructor(soundService: SoundService) {
    super()
    this.soundService = soundService
  }

  protected async process(request: StopSoundRequest): Promise<void> {
    const pitchClass = PitchClass.create(request.pitchClass as PitchClassEnum)
    await this.soundService.stopSound(pitchClass.value, request.octave, request.instrument)
  }
}