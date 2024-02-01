import { Entity } from '../base/Entity'
import { InvalidCubePositionError } from '../errors/InvalidCubePositionError'
import { CubeColor } from '../valueObjects/CubeColor'
import { CubeColorEnum } from '../enum/CubeColorEnum'
import { Id } from '../valueObjects/Id'
import { UnitInterval } from '../valueObjects/UnitInterval'
import { UnitIntervalRange } from '../valueObjects/UnitIntervalRange'

export const CubeXRange = new Map<CubeColorEnum, UnitIntervalRange>([
  [CubeColorEnum.Orange, UnitIntervalRange.create(0, 0.25)],
  [CubeColorEnum.Blue, UnitIntervalRange.create(0.25, 0.5)],
  [CubeColorEnum.Purple, UnitIntervalRange.create(0.5, 0.75)],
  [CubeColorEnum.Green, UnitIntervalRange.create(0.75, 1)],
])

interface CubeProps {
  color: CubeColor
  x: UnitInterval
  y: UnitInterval
  creation: number
  mirrored: boolean
}

export class Cube extends Entity<CubeProps> {
  private constructor(color: CubeColor, x: UnitInterval, id: Id) {
    super({
      color,
      x: x,
      y: UnitInterval.create(0),
      creation: Date.now(),
      mirrored: Cube.randomMirrored()
    }, id)
  }

  private static randomMirrored() {
    return Math.random() > 0.5
  }

  static create(color: CubeColor, x: UnitInterval) {
    if (!this.isValidPosition(color, x)) {
      throw new InvalidCubePositionError()
    }

    return new Cube(color, x, Id.create())
  }

  private static isValidPosition(color: CubeColor, x: UnitInterval): boolean {
    const range = CubeXRange.get(color.value)

    if (!range) {
      throw new Error(`Range not setted for '${color.value}' color`)
    }

    if (x.value < range.min || x.value > range.max) {
      return false
    }

    return true
  }

  static random() {
    const color = CubeColor.random()
    return new Cube(color, this.randomX(color), Id.create())
  }

  private static randomX(color: CubeColor) {
    if (color.value === 'orange') {
      return UnitInterval.random(0, 0.25)
    } else if (color.value === 'blue') {
      return UnitInterval.random(0.25, 0.5)
    } else if (color.value === 'purple') {
      return UnitInterval.random(0.5, 0.75)
    }
    return UnitInterval.random(0.75)
  }

  get color() {
    return this.props.color
  }

  get x() {
    return this.props.x
  }

  get y() {
    return this.props.y
  }

  get creation() {
    return this.props.creation
  }

  get mirrored() {
    return this.props.mirrored
  }

  get age() {
    return Date.now() - this.props.creation
  }

  public moveUp(step: number = 0.01) {
    if (this.props.y.isMaxReached()) {
      return
    }

    this.props.y = this.props.y.increment(step)
  }

  get isOnTop() {
    return this.props.y.isMaxReached()
  }
}
