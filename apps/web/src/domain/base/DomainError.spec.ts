import { describe, it, expect } from 'vitest'
import { DomainError } from './DomainError'

describe('src/domain/base/DomainError', () => {
  it('should be defined', () => {
    expect(DomainError).toBeDefined()
  })

  it('should be an instance of Error', () => {
    expect(new DomainError('TEST_ERROR', true)).toBeInstanceOf(Error)
  })

  describe('constructor', () => {
    it('should accept a code parameter', () => {
      const expectedCode = 'TEST_ERROR'
      const error = new DomainError(expectedCode, true)

      expect(error.code).toBe(expectedCode)
    })

    it('should accept an exposable parameter', () => {
      const expectedExposable = true
      const error = new DomainError('TEST_ERROR', expectedExposable)

      expect(error.exposable).toBe(expectedExposable)
    })
  })
})
