import { describe, it, expect } from 'vitest'
import { InvalidUuidError } from './InvalidUuidError'
import { DomainError } from '../base/DomainError'

describe('src/domain/valueObjects/InvalidUuidError', () => {
  it('should be defined', () => {
    expect(InvalidUuidError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new InvalidUuidError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_UUID', () => {
      const error = new InvalidUuidError()

      expect(error.toObject().code).toBe('INVALID_UUID')
    })

    it('should set exposable to false', () => {
      const error = new InvalidUuidError()

      expect(error.toObject().exposable).toBeFalsy()
    })
  })
})
