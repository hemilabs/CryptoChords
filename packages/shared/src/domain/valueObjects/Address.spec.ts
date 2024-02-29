import { describe, it, expect } from 'vitest';
import { Address } from './Address';
import { InvalidAddressError } from '../errors/InvalidAddressError';

describe('Address', () => {
  it('should create a valid Address object', () => {
    const addressValue = 'Valid Address';
    const address = Address.create(addressValue);
    expect(address.value).toBe(addressValue);
  });

  it('should throw InvalidAddressError for invalid input', () => {
    const invalidInput = 123;
    const createInvalidAddress = () => {
      Address.create(invalidInput as unknown as string);
    };
    expect(createInvalidAddress).toThrow(InvalidAddressError);
  });
});
