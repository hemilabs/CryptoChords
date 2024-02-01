import { DomainError } from '../base/DomainError'

export class InvalidIdError extends DomainError {
  constructor() {
    super('INVALID_ID', false)
  }
}
