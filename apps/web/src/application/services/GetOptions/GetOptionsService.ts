import { OptionsRepository } from '../../../domain/repositories/OptionsRepository'
import { ObservableService } from '../../ObservableService'
import { GetOptionsResponseDto } from './GetOptionsDtos'

export class GetOptionsService extends ObservableService<void, GetOptionsResponseDto>{
  private readonly optionsRepository: OptionsRepository
  
  constructor(optionsRepository: OptionsRepository) {
    super()
    this.optionsRepository = optionsRepository
  }

  protected async process(): Promise<GetOptionsResponseDto> {
    const options = await this.optionsRepository.getOptions()

    return {
      instrument: options.instrument.name,
      muted: options.muted
    }
  }
}