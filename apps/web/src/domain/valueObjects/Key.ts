import { ValueObject } from '../base/ValueObject'
import { KeyShape } from './KeyShape'
import { Pitch } from './Pitch'
import { UnitInterval } from './UnitInterval'

export interface KeyProps {
  keyShape: KeyShape
  pitch: Pitch
  x: UnitInterval
}

export class Key extends ValueObject<KeyProps> {
  private constructor(props: KeyProps) {
    super(props)
  }

  static create(props: KeyProps) {
    return new Key(props)
  }

  get keyShape() {
    return this.props.keyShape
  }

  get pitch() {
    return this.props.pitch
  }

  get x() {
    return this.props.x
  }
}
