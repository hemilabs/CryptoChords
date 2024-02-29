import { ValueObject } from '@cryptochords/shared'
import { PitchClassEnum } from '../enum/PitchClassEnum'
import { InvalidPitchClassError } from '../errors/InvalidIdPitchClassError'

export interface PitchClassProps {
  value: PitchClassEnum
}

export class PitchClass extends ValueObject<PitchClassProps> {
  private constructor(props: PitchClassProps) {
    super(props)
  }

  static create(value: PitchClassEnum) {
    if (!PitchClass.isValidValue(value)) {
      throw new InvalidPitchClassError()
    }
    return new PitchClass({ value })
  }

  private static isValidValue(value: PitchClassEnum) {
    return Object.values(PitchClassEnum).includes(value)
  }

  get value() {
    return this.props.value
  }

  get next() {
    const nextIndex = (Object.values(PitchClassEnum).indexOf(this.props.value) + 1) % Object.values(PitchClassEnum).length
    return PitchClass.create(Object.values(PitchClassEnum)[nextIndex])
  }

  get previous() {
    const previousIndex = (Object.values(PitchClassEnum).indexOf(this.props.value) - 1 + Object.values(PitchClassEnum).length) % Object.values(PitchClassEnum).length
    return PitchClass.create(Object.values(PitchClassEnum)[previousIndex])
  }
}
