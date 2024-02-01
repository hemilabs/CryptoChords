import { DomainError } from '../base/DomainError'

export class InvalidCubePositionError extends DomainError {
  constructor() {
    super('INVALID_CUBE_POSITION', true)
  }
}
