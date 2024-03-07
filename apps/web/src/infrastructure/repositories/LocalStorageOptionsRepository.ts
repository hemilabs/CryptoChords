import { InstrumentEnum } from '../../domain/enum/InstrumentEnum'
import { OptionsRepository } from '../../domain/repositories/OptionsRepository'
import { Instrument } from '../../domain/valueObjects/Instrument'
import { Options } from '../../domain/valueObjects/Options'

export class LocalStorageOptionsRepository implements OptionsRepository {
  public async setOptions(options: Options) {
    localStorage.setItem('options', JSON.stringify(options.toJSON()))
  }

  public async getOptions() {
    const options = localStorage.getItem('options')
    if (options) {
      return Options.fromJSON(JSON.parse(options))
    }

    return Options.create({
      muted: true,
      instrument: Instrument.create({ name: InstrumentEnum.Piano }) 
    })
  }
}
