import { ValueObject } from '@cryptochords/shared';

export class Entity<T> extends ValueObject<T> {
  protected constructor(props: T) {
    super(props);
  }
}
