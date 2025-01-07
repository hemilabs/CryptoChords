import { SoundService } from '../../../domain/services/SoundService';
import { ObservableService } from '../../ObservableService';
import {
  LoadInstrumentRequest,
  LoadInstrumentResponse,
} from './LoadInstrumentDtos';

export class LoadInstrumentService extends ObservableService<
  LoadInstrumentRequest,
  LoadInstrumentResponse
> {
  private soundService: SoundService;

  constructor(soundService: SoundService) {
    super();
    this.soundService = soundService;
  }

  protected async process({
    instrument,
  }: LoadInstrumentRequest): Promise<LoadInstrumentResponse> {
    await this.soundService.loadInstrument(instrument);
    return;
  }
}
