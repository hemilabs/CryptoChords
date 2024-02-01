import { describe, it, expect } from 'vitest';
import { BlockTypesEnum } from './BlockTypesEnum';

describe('BlockTypesEnum', () => {
  it('should have a LEGACY type with value "0"', () => {
    expect(BlockTypesEnum.LEGACY).toBe('0');
  });

  it('should have an EIP2930 type with value "1"', () => {
    expect(BlockTypesEnum.EIP2930).toBe('1');
  });

  it('should have an EIP1559 type with value "2"', () => {
    expect(BlockTypesEnum.EIP1559).toBe('2');
  });
});
