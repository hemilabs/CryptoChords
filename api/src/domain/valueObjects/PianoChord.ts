import { ValueObject } from '../base/ValueObject'
import { PianoChordsEnum } from '../enums/PianoChordsEnum'

interface PianoChordProps {
  value: PianoChordsEnum
}

export class PianoChord extends ValueObject<PianoChordProps> {
  private constructor(chord: PianoChordsEnum) {
    super({ value: chord })
  }

  static create(chord: PianoChordsEnum) {
    return new PianoChord(chord)
  }

  get value() {
    return this.props.value
  }
}
