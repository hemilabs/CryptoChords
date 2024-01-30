import { describe, it, expect } from 'vitest'
import { Cube } from './Cube'
import { CubeColor } from '../valueObjects/CubeColor'
import { UnitInterval } from '../valueObjects/UnitInterval'
import { InvalidCubePositionError } from '../errors/InvalidCubePositionError'
import { CubeColorEnum } from '../enum/CubeColorEnum'

describe('src/domain/entities/Cube', () => {
  it('should create a cube with valid position', () => {
    const color = CubeColor.create(CubeColorEnum.Orange)
    const x = UnitInterval.create(0)
    const cube = Cube.create(color, x)

    expect(cube.color).toBe(color)
    expect(cube.x).toBe(x)
    expect(cube.y).toBeInstanceOf(UnitInterval)
    expect(cube.creation).toBeCloseTo(Date.now(), -2)
    expect(cube.mirrored).toBeDefined()
    expect(cube.id).toBeDefined()
    expect(cube.age).toBeGreaterThan(0)
  })

  it('should not find the range of color', () => {
    const color = CubeColor.create('red' as CubeColorEnum)
    const x = UnitInterval.create(0)

    expect(() => {
      Cube.create(color, x)
    }).toThrow(Error)
  })

  it('should not create a cube with invalid position for orange', () => {
    const color = CubeColor.create(CubeColorEnum.Orange)
    const x = UnitInterval.create(0.7)

    expect(() => {
      Cube.create(color, x)
    }).toThrow(InvalidCubePositionError)
  })

  it('should not create a cube with invalid position for blue', () => {
    const color = CubeColor.create(CubeColorEnum.Blue)
    const x = UnitInterval.create(0.1)

    expect(() => {
      Cube.create(color, x)
    }).toThrow(InvalidCubePositionError)
  })

  it('should not create a cube with invalid position for purple', () => {
    const color = CubeColor.create(CubeColorEnum.Purple)
    const x = UnitInterval.create(0.3)

    expect(() => {
      Cube.create(color, x)
    }).toThrow(InvalidCubePositionError)
  })

  it('should not create a cube with invalid position for green', () => {
    const color = CubeColor.create(CubeColorEnum.Green)
    const x = UnitInterval.create(0.4)

    expect(() => {
      Cube.create(color, x)
    }).toThrow(InvalidCubePositionError)
  })

  it('should create a cube with y equals 0', () => {
    const color = CubeColor.create(CubeColorEnum.Orange)
    const x = UnitInterval.create(0)
    const cube = Cube.create(color, x)

    expect(cube.y.value).toEqual(0)
  })

  it('should move the cube up', () => {
    const cube = Cube.random()

    cube.moveUp(0.5)

    expect(cube.y.value).toEqual(0.5)
  })

  it('should move the cube up using the default step value', () => {
    const cube = Cube.random()

    cube.moveUp()

    expect(cube.y.value).toEqual(0.01)
  })

  it('should not move the cube up if it is on top', () => {
    const cube = Cube.random()

    cube.moveUp(1)

    expect(cube.y.value).toEqual(1)

    cube.moveUp(0.001)

    expect(cube.y.value).toEqual(1)
  })

  it('should check if the cube is on top', () => {
    const cube = Cube.random()

    cube.moveUp(1)

    expect(cube.isOnTop).toBeTruthy()
  })

  it('should check if the cube is not on top', () => {
    const cube = Cube.random()

    cube.moveUp(0.9999999)

    expect(cube.isOnTop).toBeFalsy()
  })
})
