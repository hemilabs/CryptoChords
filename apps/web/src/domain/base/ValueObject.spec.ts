import { describe, it, expect } from 'vitest'
import { ValueObject } from './ValueObject'

interface TestProps {
  value: string
}

class TestValueObject extends ValueObject<TestProps> {
  static create(props: TestProps): TestValueObject {
    return new TestValueObject(props)
  }

  get value(): string {
    return this.props.value
  }
}

describe('src/domain/base/ValueObject', () => {
  it('should be defined', () => {
    expect(ValueObject).toBeDefined()
  })

  it('should set the props in the constructor', () => {
    const expectedProps: TestProps = { value: 'test' }
    const valueObject = TestValueObject.create(expectedProps)

    expect(valueObject.value).toBe(expectedProps.value)
  })
})
