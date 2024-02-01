import { describe, expect, it } from 'vitest'
import { DomainError } from '../base/DomainError'
import { InvalidNameError } from './InvalidNameError'

describe('src/domain/errors/InvalidNameError', () => {
  it('should be defined', () => {
    expect(InvalidNameError).toBeDefined()
  })

  it('should be an instance of DomainError', () => {
    const error = new InvalidNameError()

    expect(error).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_NAME', () => {
      const error = new InvalidNameError()

      expect(error.code).toBe('INVALID_NAME')
    })

    it('should set error exposable to true', () => {
      const error = new InvalidNameError()

      expect(error.exposable).toBeTruthy()
    })
  })
})
