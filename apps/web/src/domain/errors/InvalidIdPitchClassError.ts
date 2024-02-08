import { DomainError } from '../base/DomainError'

export class InvalidPitchClassError extends DomainError {
  constructor() {
    super('INVALID_PITCH_CLASS', false)
  }
}
