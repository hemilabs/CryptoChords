import { DomainError } from '../base/DomainError'

export class InvalidUnitIntervalError extends DomainError {
  constructor() {
    super('INVALID_UNIT_INTERVAL', true)
  }
}
