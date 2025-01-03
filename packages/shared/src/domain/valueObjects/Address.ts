import { ValueObject } from '../base/ValueObject';
import { InvalidAddressError } from '../errors/InvalidAddressError';

interface AddressProps {
  value: string;
}

export class Address extends ValueObject<AddressProps> {
  private constructor(name: string) {
    super({ value: name });
  }

  static create(name: string) {
    if (typeof name !== 'string') {
      throw new InvalidAddressError();
    }

    return new Address(name);
  }

  get value() {
    return this.props.value;
  }
}
