import { PitchClassEnum } from '../enum/PitchClassEnum';

export interface SoundService {
  loadInstrument(instrument: string): Promise<void>;
  playSound(
    pitch: PitchClassEnum,
    octave: number,
    instrument: string,
  ): Promise<void>;
  stopSound(
    pitch: PitchClassEnum,
    octave: number,
    instrument: string,
  ): Promise<void>;
}
