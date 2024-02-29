import { ValueObject } from '@cryptochords/shared'
import { KeyShape } from './KeyShape'
import { Pitch } from './Pitch'
import { UnitInterval } from './UnitInterval'

export interface KeyProps {
  keyShape: KeyShape
  pitch: Pitch
  x: UnitInterval
  color: string
  pressed: boolean
}

export class Key extends ValueObject<KeyProps> {
  private constructor(props: KeyProps) {
    super(props)
  }

  static create(props: KeyProps) {
    return new Key(props)
  }

  press() {
    this.props.pressed = true
  }

  release() {
    this.props.pressed = false
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

  get color() {
    return this.props.color
  }

  get pressed() {
    return this.props.pressed
  }
}
