import { SoundService } from '../../../domain/services/SoundService';
import { ToneJS } from '../../../infrastructure/services/ToneJs';

export interface DomainServices {
  soundService: SoundService;
}

export const domainServices: DomainServices = {
  soundService: new ToneJS(),
};
