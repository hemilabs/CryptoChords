import { describe, it, expect } from 'vitest';
import { Timestamp } from './Timestamp';
import { InvalidTimestampError } from '../errors/InvalidTimestampError';

describe('Timestamp', () => {
  it('should create a valid Timestamp object', () => {
    const timestampValue = 0;
    const timestamp = Timestamp.create(timestampValue);
    expect(timestamp.value).toBe(timestampValue);
  });

  it('should throw InvalidTimestampError for invalid input', () => {
    const invalidInput = '123';
    const createInvalidTimestamp = () => {
      Timestamp.create(invalidInput as unknown as number);
    };
    expect(createInvalidTimestamp).toThrow(InvalidTimestampError);
  });
});
