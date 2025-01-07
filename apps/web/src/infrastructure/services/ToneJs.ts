import {
  Instrument,
  InstrumentOptions,
} from 'tone/build/esm/instrument/Instrument';
import InstrumentBassElectricMp3 from 'tonejs-instrument-bass-electric-mp3';
import InstrumentBassoonMp3 from 'tonejs-instrument-bassoon-mp3';
import InstrumentClarinetMp3 from 'tonejs-instrument-clarinet-mp3';
import InstrumentContrabassMp3 from 'tonejs-instrument-contrabass-mp3';
import InstrumentFluteMp3 from 'tonejs-instrument-flute-mp3';
import InstrumentFrenchHornMp3 from 'tonejs-instrument-french-horn-mp3';
import InstrumentGuitarAcousticMp3 from 'tonejs-instrument-guitar-acoustic-mp3';
import InstrumentGuitarElectricMp3 from 'tonejs-instrument-guitar-electric-mp3';
import InstrumentGuitarNylonMp3 from 'tonejs-instrument-guitar-nylon-mp3';
import InstrumentHarmoniumMp3 from 'tonejs-instrument-harmonium-mp3';
import InstrumentHarpMp3 from 'tonejs-instrument-harp-mp3';
import InstrumentOrganMp3 from 'tonejs-instrument-organ-mp3';
import InstrumentPianoMp3 from 'tonejs-instrument-piano-mp3';
import InstrumentSaxophoneMp3 from 'tonejs-instrument-saxophone-mp3';
import InstrumentTromboneMp3 from 'tonejs-instrument-trombone-mp3';
import InstrumentTrumpetMp3 from 'tonejs-instrument-trumpet-mp3';
import InstrumentTubaMp3 from 'tonejs-instrument-tuba-mp3';
import InstrumentViolinMp3 from 'tonejs-instrument-violin-mp3';
import InstrumentXylophoneMp3 from 'tonejs-instrument-xylophone-mp3';

import { InstrumentEnum } from '../../domain/enum/InstrumentEnum';
import { SoundService } from '../../domain/services/SoundService';

export class ToneJS implements SoundService {
  static instruments: Map<string, Instrument<InstrumentOptions>> = new Map();

  static async getInstrument(
    instrumentId: string,
  ): Promise<Instrument<InstrumentOptions>> {
    let instrument = ToneJS.instruments.get(instrumentId);
    if (instrument) {
      return instrument;
    }

    const InstrumentClass = ToneJS.getInstrumentClass(instrumentId);

    return new Promise<Instrument<InstrumentOptions>>(resolve => {
      instrument = new InstrumentClass({
        onload: () => {
          ToneJS.instruments.set(instrumentId, instrument!);
          resolve(ToneJS.getInstrument(instrumentId));
        },
      }).toDestination();
    });
  }

  // eslint-disable-next-line complexity
  static getInstrumentClass(instrumentId: string) {
    switch (instrumentId) {
      case InstrumentEnum.BassElectric:
        return InstrumentBassElectricMp3;
      case InstrumentEnum.Bassoon:
        return InstrumentBassoonMp3;
      case InstrumentEnum.Clarinet:
        return InstrumentClarinetMp3;
      case InstrumentEnum.Contrabass:
        return InstrumentContrabassMp3;
      case InstrumentEnum.Flute:
        return InstrumentFluteMp3;
      case InstrumentEnum.FrenchHorn:
        return InstrumentFrenchHornMp3;
      case InstrumentEnum.GuitarAcoustic:
        return InstrumentGuitarAcousticMp3;
      case InstrumentEnum.GuitarElectric:
        return InstrumentGuitarElectricMp3;
      case InstrumentEnum.GuitarNylon:
        return InstrumentGuitarNylonMp3;
      case InstrumentEnum.Harmonium:
        return InstrumentHarmoniumMp3;
      case InstrumentEnum.Harp:
        return InstrumentHarpMp3;
      case InstrumentEnum.Organ:
        return InstrumentOrganMp3;
      case InstrumentEnum.Piano:
        return InstrumentPianoMp3;
      case InstrumentEnum.Saxophone:
        return InstrumentSaxophoneMp3;
      case InstrumentEnum.Trombone:
        return InstrumentTromboneMp3;
      case InstrumentEnum.Trumpet:
        return InstrumentTrumpetMp3;
      case InstrumentEnum.Tuba:
        return InstrumentTubaMp3;
      case InstrumentEnum.Violin:
        return InstrumentViolinMp3;
      case InstrumentEnum.Xylophone:
        return InstrumentXylophoneMp3;
      default:
        throw new Error(`Instrument ${instrumentId} not found`);
    }
  }

  async loadInstrument(instrument: string): Promise<void> {
    await ToneJS.getInstrument(instrument);
  }

  async playSound(
    pitch: string,
    octave: number,
    instrument: string,
  ): Promise<void> {
    const instrumentInstance = await ToneJS.getInstrument(instrument);
    instrumentInstance.triggerAttack(`${pitch}${octave}`);
  }

  async stopSound(
    pitch: string,
    octave: number,
    instrument: string,
  ): Promise<void> {
    const instrumentInstance = await ToneJS.getInstrument(instrument);
    instrumentInstance.triggerRelease(`${pitch}${octave}`);
  }
}
