import { describe, expect, it } from 'vitest';
import { DomainError } from '../base/DomainError';
import { InvalidAddressError } from './InvalidAddressError';

describe('src/domain/errors/InvalidAddressError', () => {
  it('should be defined', () => {
    expect(InvalidAddressError).toBeDefined();
  });

  it('should be an instance of DomainError', () => {
    const error = new InvalidAddressError();

    expect(error).toBeInstanceOf(DomainError);
  });

  describe('constructor', () => {
    it('should set error code to INVALID_ADDRESS', () => {
      const error = new InvalidAddressError();

      expect(error.code).toBe('INVALID_ADDRESS');
    });
  });
});
