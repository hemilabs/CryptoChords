import { DomainError } from '../base/DomainError'

export class InvalidUuidError extends DomainError {
  constructor() {
    super('INVALID_UUID', false)
  }
}
