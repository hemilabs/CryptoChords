import { ValueObject } from '../base/ValueObject'
import { PianoTypesEnum } from '../enums/PianoTypesEnum'

interface PianoTypesProps {
  value: PianoTypesEnum
}

export class PianoTypes extends ValueObject<PianoTypesProps> {
  private constructor(pianoType: PianoTypesEnum) {
    super({ value: pianoType })
  }

  static create(pianoType: PianoTypesEnum) {
    return new PianoTypes(pianoType)
  }

  get value() {
    return this.props.value
  }
}
