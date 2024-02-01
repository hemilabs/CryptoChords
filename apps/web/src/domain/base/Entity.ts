import { ValueObject } from './ValueObject'
import { Id } from '../valueObjects/Id'

export class Entity<T> extends ValueObject<T> {
  id: Id

  protected constructor(props: T, id: Id) {
    super(props)
    this.id = id
  }
}
