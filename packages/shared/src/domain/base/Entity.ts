import { ValueObject } from './ValueObject';
import { Uuid } from '../valueObjects/Uuid';

export class Entity<T> extends ValueObject<T> {
  uuid: Uuid;

  protected constructor(props: T, uuid: Uuid) {
    super(props);
    this.uuid = uuid;
  }

  get id() {
    return this.uuid;
  }
}
