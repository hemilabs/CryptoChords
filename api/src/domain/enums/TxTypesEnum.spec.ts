import { describe, it, expect } from 'vitest';
import { TxTypesEnum } from './TxTypesEnum';

describe('TxTypesEnum', () => {
  it('should have a Block type with value "block"', () => {
    expect(TxTypesEnum.Block).toBe('block');
  });

  it('should have an Eth type with value "eth"', () => {
    expect(TxTypesEnum.Eth).toBe('eth');
  });

  it('should have a Btc type with value "btc"', () => {
    expect(TxTypesEnum.Btc).toBe('btc');
  });

  it('should have a Pop type with value "pop"', () => {
    expect(TxTypesEnum.Pop).toBe('pop');
  });
});
