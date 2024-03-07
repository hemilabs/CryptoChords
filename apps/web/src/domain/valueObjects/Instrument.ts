import { ValueObject } from '@cryptochords/shared'
import { InstrumentEnum } from '../enum/InstrumentEnum'

export interface InstrumentProps {
  name: InstrumentEnum
}

export class Instrument extends ValueObject<InstrumentProps>{
  private constructor(props: InstrumentProps) {
    super(props)
  }

  static create(props: InstrumentProps) {
    return new Instrument(props)
  }

  get name() {
    return this.props.name
  }
}
