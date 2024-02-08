import { ValueObject } from '../base/ValueObject'
import { PitchClass } from './PitchClass'

export interface PitchProps {
  class: PitchClass
  octave: number
}

export class Pitch extends ValueObject<PitchProps> {
  private constructor(props: PitchProps) {
    super(props)
  }

  static create(props: PitchProps) {
    return new Pitch(props)
  }

  get class() {
    return this.props.class
  }

  get octave() {
    return this.props.octave
  }
}
