export class DomainError extends Error {
  code: string
  exposable: boolean

  constructor(code: string, exposable: boolean) {
    super(code)

    this.code = code
    this.exposable = exposable
  }
}
