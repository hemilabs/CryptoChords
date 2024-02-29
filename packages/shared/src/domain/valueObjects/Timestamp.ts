import { ValueObject } from '../base/ValueObject'
import { InvalidTimestampError } from '../errors/InvalidTimestampError'

interface TimestampProps {
  value: number
}

export class Timestamp extends ValueObject<TimestampProps> {
  private constructor(name: number) {
    super({ value: name })
  }

  static create(name: number) {
    if (typeof name !== 'number') {
      throw new InvalidTimestampError()
    }

    return new Timestamp(name)
  }

  get value() {
    return this.props.value
  }
}
