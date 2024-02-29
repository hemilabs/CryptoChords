import { describe, it, expect } from 'vitest'
import { v4, validate } from 'uuid'
import { InvalidUuidError } from '../errors/InvalidUuidError'
import { Uuid } from './Uuid'
import { ValueObject } from '../base/ValueObject'

describe('src/domain/valueObjects/Uuid', () => {
  it('should be defined', () => {
    expect(Uuid).toBeDefined()
  })

  it('should be instance of ValueObject', () => {
    expect(Uuid.create()).toBeInstanceOf(ValueObject)  
  })

  describe('create', () => {
    describe('when an id is not provided', () => {
      it('should generate a valid uuid', () => {
        const uuid = Uuid.create()

        expect(validate(uuid.value)).toBeTruthy()
      });
    });

    describe('when a valid id is provided', () => {
      it('should set the id as value', () => {
        const validId = v4()
        const uuid = Uuid.create(validId)

        expect(uuid.value).toEqual(validId)
      });
    });

    describe('when an invalid id is provided', () => {
      it('should set the id as value', () => {
        const invalidId = 'invalid-id'
        const test = () => {
          Uuid.create(invalidId)
        }

        expect(test).toThrowError(InvalidUuidError)
      });
    });
  })
})
