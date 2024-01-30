import { DomainError } from '../base/DomainError'

export class InvalidNameError extends DomainError {
  constructor() {
    super('INVALID_NAME', true)
  }
}
