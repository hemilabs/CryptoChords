import { describe, expect, it } from 'vitest'
import { DomainError } from '../base/DomainError'
import { InvalidTimestampError } from './InvalidTimestampError'

describe('src/domain/errors/InvalidTimestampError', () => {
  it('should be defined', () => {
    expect(InvalidTimestampError).toBeDefined()
  })

  it('should be an instance of DomainError', () => {
    const error = new InvalidTimestampError()

    expect(error).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_TIMESTAMP', () => {
      const error = new InvalidTimestampError()

      expect(error.code).toBe('INVALID_TIMESTAMP')
    })
  })
})
