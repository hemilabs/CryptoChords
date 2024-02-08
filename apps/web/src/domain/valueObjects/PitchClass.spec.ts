import { describe, expect, it } from 'vitest'
import { PitchClass } from './PitchClass'
import { InvalidPitchClassError } from '../errors/InvalidIdPitchClassError'
import { PitchClassEnum } from '../enum/PitchClassEnum'

describe('src/domain/valueObjects/PitchClass', () => {
  it('should be defined', () => {
    expect(PitchClass).toBeDefined()
  })

  it('should return the correct value', () => {
    const pitchClass = PitchClass.create(PitchClassEnum.A)
    expect(pitchClass.value).toBe(PitchClassEnum.A)
  })

  it('should throw an error when the value is invalid', () => {
    expect(() => {
      PitchClass.create('Z' as PitchClassEnum)
    }).toThrow(InvalidPitchClassError)
  })
})