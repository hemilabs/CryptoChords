interface DomainErrorProps {
  code: string
  exposable: boolean
}

export class DomainError extends Error {
  code: string
  exposable: boolean

  constructor(code: string, exposable: boolean = false) {
    super(code)
    this.code = code
    this.exposable = exposable
  }

  toObject(): DomainErrorProps {
    const { code, exposable } = this

    return { code, exposable }
  }
}
