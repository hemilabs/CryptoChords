import { PitchClassEnum } from '../../../domain/enum/PitchClassEnum'
import { OptionsRepository } from '../../../domain/repositories/OptionsRepository'
import { SoundService } from '../../../domain/services/SoundService'
import { PitchClass } from '../../../domain/valueObjects/PitchClass'
import { ObservableService } from '../../ObservableService'
import { PlaySoundRequest, PlaySoundResponse } from './PlaySoundDtos'

export class PlaySoundService extends ObservableService<PlaySoundRequest, PlaySoundResponse>{

  private soundService: SoundService
  private optionsRepository: OptionsRepository

  constructor(soundService: SoundService, optionsRepository: OptionsRepository) {
    super()
    this.soundService = soundService
    this.optionsRepository = optionsRepository
  }

  protected async process(request: PlaySoundRequest): Promise<PlaySoundResponse> {
    const options = await this.optionsRepository.getOptions()

    if(options.muted) {
      return {}
    }

    const pitchClass = PitchClass.create(request.pitchClass as PitchClassEnum)
    await this.soundService.playSound(pitchClass.value, request.octave, options.instrument.name)

    return { instrument: options.instrument.name }
  }
}