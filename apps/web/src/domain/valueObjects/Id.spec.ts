import { describe, it, expect } from 'vitest'
import { ValueObject } from '../base/ValueObject'
import { Id } from './Id'
import { InvalidIdError } from '../errors/InvalidIdError'

describe('src/domain/valueObjects/Id', () => {
  const validId = 'i-0878cdc0d415b217a'

  it('should be defined', () => {
    expect(Id).toBeDefined()
  })

  it('should be an instance of ValueObject', () => {
    expect(Id.create(validId)).toBeInstanceOf(ValueObject)
  })

  describe('create', () => {
    describe('when a valid Id is provided as parameter', () => {
      it('should set the valid id in the value props', () => {
        const id = Id.create(validId)

        expect(id.value).toBe(validId)
      })
    })

    describe('when an invalid id is provided as parameter', () => {
      it('should throw an error', () => {
        const invalidId = 123456
        const test = () => {
          // @ts-expect-error InvalidIdError is expected to be thrown
          Id.create(invalidId)
        }

        expect(test).toThrowError(InvalidIdError)
      })
    })

    describe('when no id is provided as parameter', () => {
      it('should generate a random id', () => {
        const id = Id.create()

        expect(id.value).toBeDefined()
      })
    })
  })
})
