import { DomainError } from '@cryptochords/shared'

export class InvalidUnitIntervalError extends DomainError {
  constructor() {
    super('INVALID_UNIT_INTERVAL', true)
  }
}
