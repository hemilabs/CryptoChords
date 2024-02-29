import { DomainError } from '../base/DomainError'

export class InvalidTimestampError extends DomainError {
  constructor() {
    super('INVALID_TIMESTAMP', true)
  }
}
