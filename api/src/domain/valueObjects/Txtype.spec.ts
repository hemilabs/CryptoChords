import { describe, it, expect } from 'vitest';
import { TxTypesEnum } from '../enums/TxTypesEnum';
import { TxType } from './Txtype';

describe('TxType', () => {
  it('should create a TxType object with a valid transaction type', () => {
    Object.values(TxTypesEnum).forEach(txTypeValue => {
      const txType = TxType.create(txTypeValue);
      expect(txType.value).toBe(txTypeValue);
    });
  });
});
