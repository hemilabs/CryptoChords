import { describe, expect, it } from 'vitest'
import { UnitInterval } from './UnitInterval'

describe('src/domain/valueObjects/UnitInterval', () => {
  it('should be defined', () => {
    expect(UnitInterval).toBeDefined()
  })

  it('should throw an error when a value greater than 1 is provided', () => {
    const test = () => {
      UnitInterval.create(1.1)
    }

    expect(test).toThrowError()
  })

  it('should throw an error when a value less than 0 is provided', () => {
    const test = () => {
      UnitInterval.create(-0.1)
    }

    expect(test).toThrowError()
  })

  it('Should return a value between 0 and 1', () => {
    const unitInterval = UnitInterval.random()

    expect(unitInterval.value).toBeGreaterThanOrEqual(0)
    expect(unitInterval.value).toBeLessThanOrEqual(1)
  })

  it('Should return a value between 0 and 0.25', () => {
    const unitInterval = UnitInterval.random(0, 0.25)

    expect(unitInterval.value).toBeGreaterThanOrEqual(0)
    expect(unitInterval.value).toBeLessThanOrEqual(0.25)
  })

  it('Should return a value between 0.25 and 0.26', () => {
    const unitInterval = UnitInterval.random(0.25, 0.26)

    expect(unitInterval.value).toBeGreaterThanOrEqual(0.25)
    expect(unitInterval.value).toBeLessThanOrEqual(0.26)
  })

  it('Should return a value less than than 0.01 or equal', () => {
    const unitInterval = UnitInterval.random(undefined, 0.01)

    expect(unitInterval.value).toBeGreaterThanOrEqual(0)
    expect(unitInterval.value).toBeLessThanOrEqual(0.01)
  })

  it('Should return a value greater than than 0.9 or equal', () => {
    const unitInterval = UnitInterval.random(0.9)

    expect(unitInterval.value).toBeGreaterThanOrEqual(0.9)
    expect(unitInterval.value).toBeLessThanOrEqual(1)
  })

  it('Should increment the value correctly', () => {
    const unitInterval = UnitInterval.create(0.5)

    const incremented = unitInterval.increment(0.1)

    expect(incremented.value).toBe(0.6)
  })

  it('Should not increment the value greater than 1', () => {
    const unitInterval = UnitInterval.create(0.9)

    const incremented = unitInterval.increment(0.2)

    expect(incremented.value).toBe(1)
  })

  it('Should return true when the value is 1', () => {
    const unitInterval = UnitInterval.create(1)

    expect(unitInterval.isMaxReached()).toBe(true)
  })

  it('Should return false when the value is less than 1', () => {
    const unitInterval = UnitInterval.create(0.9)

    expect(unitInterval.isMaxReached()).toBe(false)
  })
})
