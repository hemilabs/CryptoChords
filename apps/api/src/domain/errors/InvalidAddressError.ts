import { DomainError } from '@cryptochords/shared'

export class InvalidAddressError extends DomainError {
  constructor() {
    super('INVALID_ADDRESS', true)
  }
}
