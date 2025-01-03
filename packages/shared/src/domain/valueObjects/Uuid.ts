import { v4, validate } from 'uuid';
import { ValueObject } from '../base/ValueObject';
import { InvalidUuidError } from '../errors/InvalidUuidError';

interface UuidProps {
  value: string;
}
export class Uuid extends ValueObject<UuidProps> {
  private constructor(id: string) {
    super({ value: id });
  }

  static create(id?: string): Uuid {
    if (id && !validate(id)) {
      throw new InvalidUuidError();
    }

    return new Uuid(id || v4());
  }

  get value(): string {
    return this.props.value;
  }
}
