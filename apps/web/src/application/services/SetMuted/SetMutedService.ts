import { OptionsRepository } from '../../../domain/repositories/OptionsRepository';
import { Options } from '../../../domain/valueObjects/Options';
import { ObservableService } from '../../ObservableService';
import { SetMutedRequest } from './SetMutedDtos';

export class SetMutedService extends ObservableService<SetMutedRequest, void> {
  private optionsRepository: OptionsRepository;

  constructor(optionsRepository: OptionsRepository) {
    super();
    this.optionsRepository = optionsRepository;
  }

  protected async process(request: SetMutedRequest): Promise<void> {
    const options = await this.optionsRepository.getOptions();
    this.optionsRepository.setOptions(
      Options.create({
        instrument: options.instrument,
        muted: request.muted,
      }),
    );
  }
}
