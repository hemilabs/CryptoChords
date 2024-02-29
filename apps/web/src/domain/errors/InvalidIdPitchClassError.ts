import { DomainError } from '@cryptochords/shared'

export class InvalidPitchClassError extends DomainError {
  constructor() {
    super('INVALID_PITCH_CLASS', false)
  }
}
