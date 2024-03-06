import { describe, it, expect } from 'vitest'
import { Entity } from './Entity'
import { ValueObject } from '@cryptochords/shared'

interface TestProps {
  value: string
}

class TestEntity extends Entity<TestProps> {
  static create(props: TestProps): TestEntity {
    return new TestEntity(props)
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
    const entity = TestEntity.create({ value: 'test'})

    expect(entity).toBeInstanceOf(ValueObject)
  })
})
