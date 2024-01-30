import { describe, it, expect } from 'vitest'
import { DomainError } from '../base/DomainError'
import { InvalidIdError } from './InvalidIdError'

describe('src/domain/errors/InvalidIdError', () => {
  it('should be defined', () => {
    expect(InvalidIdError).toBeDefined()
  })

  it('should be an instance of DomainError', () => {
    expect(new InvalidIdError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set INVALID_ID as error code', () => {
      const error = new InvalidIdError()

      expect(error.code).toBe('INVALID_ID')
    })

    it('should set exposable to false', () => {
      const error = new InvalidIdError()

      expect(error.exposable).toBeFalsy()
    })
  })
})
