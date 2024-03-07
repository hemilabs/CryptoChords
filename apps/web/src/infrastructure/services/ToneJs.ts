import { Instrument, InstrumentOptions } from 'tone/build/esm/instrument/Instrument'
import InstrumentHarmoniumMp3 from 'tonejs-instrument-harmonium-mp3'
import InstrumentOrganMp3 from 'tonejs-instrument-organ-mp3'
import InstrumentPianoMp3 from 'tonejs-instrument-piano-mp3'
import InstrumentSaxophoneMp3 from 'tonejs-instrument-saxophone-mp3'
import { SoundService } from '../../domain/services/SoundService'

export class ToneJS implements SoundService {
  static instruments: Map<string, Instrument<InstrumentOptions>> = new Map()

  static async getInstrument(instrumentId: string): Promise<Instrument<InstrumentOptions>>{
    let instrument = ToneJS.instruments.get(instrumentId)
    if(instrument) {
      return instrument
    }

    return new Promise<Instrument<InstrumentOptions>>((resolve) => {
      if(instrumentId === 'piano') {
        instrument = new InstrumentPianoMp3({
          onload: () => resolve(ToneJS.getInstrument(instrumentId))
        }).toDestination()
        ToneJS.instruments.set(instrumentId, instrument)
        return
      }

      if(instrumentId === 'saxophone') {
        instrument = new InstrumentSaxophoneMp3({
          onload: () => resolve(ToneJS.getInstrument(instrumentId))
        }).toDestination()
        ToneJS.instruments.set(instrumentId, instrument)
        return
      }

      if(instrumentId === 'organ') {
        instrument = new InstrumentOrganMp3({
          onload: () => resolve(ToneJS.getInstrument(instrumentId))
        }).toDestination()
        ToneJS.instruments.set(instrumentId, instrument)
        return
      }

      if(instrumentId === 'harmonium') {
        instrument = new InstrumentHarmoniumMp3({
          onload: () => resolve(ToneJS.getInstrument(instrumentId))
        }).toDestination()
        ToneJS.instruments.set(instrumentId, instrument)
        return
      }

      throw new Error(`Instrument ${instrumentId} not found`)
    })
  }

  async loadInstrument(instrument: string): Promise<void> {
    await ToneJS.getInstrument(instrument)
  }

  async playSound(pitch: string, octave: number, instrument: string): Promise<void> {
    (await ToneJS.getInstrument(instrument)).triggerAttack(`${pitch}${octave}`);
  }

  async stopSound(pitch: string, octave: number, instrument: string): Promise<void> {
    (await ToneJS.getInstrument(instrument)).triggerRelease(`${pitch}${octave}`);
  }
}