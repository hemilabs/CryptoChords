import { ValueObject } from './ValueObject'

export class Entity<T> extends ValueObject<T> {
  protected constructor(props: T) {
    super(props)
  }
}
