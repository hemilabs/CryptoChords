import { describe, it, expect } from 'vitest';
import { NetworkEnum } from './NetworkEnum';

describe('NetworkEnum', () => {
  it('should have a MAINNET type with value "mainnet"', () => {
    expect(NetworkEnum.MAINNET).toBe('mainnet');
  });

  it('should have a TESTNET type with value "testnet"', () => {
    expect(NetworkEnum.TESTNET).toBe('testnet');
  });
});
