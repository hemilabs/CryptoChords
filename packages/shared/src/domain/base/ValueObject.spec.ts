import { describe, it, expect } from "vitest"
import { ValueObject } from "./ValueObject"

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

describe("src/domain/ValueObject", () => {
  it("should be defined", () => {
    expect(ValueObject).toBeDefined()
  })

  it("should set props attribute from the constructor", () => {
    const expectedProps = { value: "test" }
    const entity = TestValueObject.create(expectedProps)

    expect(entity.value).toStrictEqual(expectedProps.value)
  })
})
