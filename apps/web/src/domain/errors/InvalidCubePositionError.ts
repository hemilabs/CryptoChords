import { DomainError } from '@cryptochords/shared'

export class InvalidCubePositionError extends DomainError {
  constructor() {
    super('INVALID_CUBE_POSITION', true)
  }
}
