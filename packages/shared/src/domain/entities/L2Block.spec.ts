import { describe, expect, it } from 'vitest';
import { Entity } from '../base/Entity';
import { TxType } from '../valueObjects/Txtype';
import { TxTypesEnum } from '../enums/TxTypesEnum';
import { Address } from '../valueObjects/Address';
import { L2Block } from './L2Block';

describe('src/domain/entities/L2Block', () => {
  const txType = TxType.create(TxTypesEnum.Eth);
  const address = Address.create('0xbhbfhudhuf');

  it('should be defined', () => {
    expect(L2Block).toBeDefined();
  });

  it('should be an instance of Entity', () => {
    const l2Block = L2Block.create({
      txType,
      address,
    });

    expect(l2Block).toBeInstanceOf(Entity);
  });

  describe('create', () => {
    const l2Block = L2Block.create({
      txType,
      address,
    });

    it('should set the txType on tagname txType', () => {
      expect(l2Block.txType).toBe(txType.value);
    });

    it('should set the address on address property', () => {
      expect(l2Block.address).toBe(address.value);
    });
  });
});
