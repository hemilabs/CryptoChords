import { ValueObject } from '../base/ValueObject'
import { KeyShapeEnum } from '../enum/KeyShapeEnum'

interface KeyShapeProps {
  value: KeyShapeEnum
}

export class KeyShape extends ValueObject<KeyShapeProps>{
  private constructor(shape: KeyShapeEnum) {
    super({ value: shape })
  }

  static create(shape: KeyShapeEnum) {
    return new KeyShape(shape)
  }

  get value() {
    return this.props.value
  }
}