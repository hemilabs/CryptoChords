import { DomainError } from '../base/DomainError'

export class InvalidAddressError extends DomainError {
  constructor() {
    super('INVALID_ADDRESS', true)
  }
}
