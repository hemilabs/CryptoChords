import { InstrumentEnum } from '../../../domain/enum/InstrumentEnum';
import { OptionsRepository } from '../../../domain/repositories/OptionsRepository';
import { Instrument } from '../../../domain/valueObjects/Instrument';
import { Options } from '../../../domain/valueObjects/Options';
import { ObservableService } from '../../ObservableService';
import { SetInstrumentRequest } from './SetInstrumentDtos';

export class SetInstrumentService extends ObservableService<
  SetInstrumentRequest,
  void
> {
  private optionsRepository: OptionsRepository;

  constructor(optionsRepository: OptionsRepository) {
    super();
    this.optionsRepository = optionsRepository;
  }

  protected async process(request: SetInstrumentRequest): Promise<void> {
    const options = await this.optionsRepository.getOptions();
    this.optionsRepository.setOptions(
      Options.create({
        instrument: Instrument.create({
          name: request.instrument as InstrumentEnum,
        }),
        muted: options.muted,
      }),
    );
  }
}
