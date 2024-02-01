import { describe, it, expect } from 'vitest'
import { Entity } from './Entity'
import { ValueObject } from './ValueObject'
import { Id } from '../valueObjects/Id'

interface TestProps {
  value: string
}

class TestEntity extends Entity<TestProps> {
  static create(props: TestProps, id: Id): TestEntity {
    return new TestEntity(props, id)
  }

  get value(): string {
    return this.props.value
  }
}

describe('src/domain/base/Entity', () => {
  it('should be defined', () => {
    expect(Entity).toBeDefined()
  })

  it('should be an instance of ValueObject', () => {
    const id = Id.create('TestId')
    const entity = TestEntity.create({ value: 'test'}, id)

    expect(entity).toBeInstanceOf(ValueObject)
  })

  describe('create', () => {
    it('should set the id if it was provided as parameter', () => {
      const expectedId = Id.create('TestId')
      const entity = TestEntity.create({ value: 'test' }, expectedId)

      expect(entity.id.value).toBe(expectedId.value)
    })
  })
})
