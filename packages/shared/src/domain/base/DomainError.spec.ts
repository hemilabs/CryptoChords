import { describe, it, expect } from "vitest"
import { DomainError } from "./DomainError"

describe("src/domain/DomainError", () => {
  it("should be defined", () => {
    expect(DomainError).toBeDefined()
  })

  it("should be instance of Error", () => {
    expect(new DomainError("TEST_ERROR")).toBeInstanceOf(Error)
  })

  describe("constructor", () => {
    it("should accept a code parameter", () => {
      const errorCode = "TEST_ERROR"
      const domainError = new DomainError(errorCode)

      expect(domainError.toObject().code).toBe(errorCode)
    })

    it("should accept a exposable parameter", () => {
      const exposable = true
      const domainError = new DomainError("TEST_ERROR", exposable)

      expect(domainError.toObject().exposable).toBe(exposable)
    })
  })
})
