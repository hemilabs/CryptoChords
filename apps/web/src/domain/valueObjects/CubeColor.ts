import { ValueObject } from '../base/ValueObject'
import { CubeColorEnum } from '../enum/CubeColorEnum'

interface CubeColorProps {
  value: CubeColorEnum
}

export class CubeColor extends ValueObject<CubeColorProps> {
  private constructor(color: CubeColorEnum) {
    super({ value: color })
  }

  static create(color: CubeColorEnum) {
    return new CubeColor(color)
  }

  static random() {
    return this.create(CubeColor.randomColorValue())
  }

  private static randomColorValue(): CubeColorEnum {
    const enumValues = Object.values(CubeColorEnum)
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue as CubeColorEnum
  }

  get value() {
    return this.props.value
  }
}
