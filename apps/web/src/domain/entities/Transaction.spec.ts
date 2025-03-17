import { describe, it, expect } from 'vitest';
import { Transaction } from './Transaction';
import { NetworkEnum, TxType } from '@cryptochords/shared';
import { Network } from './Network';
import { Address } from '@cryptochords/shared';
import { Timestamp } from '@cryptochords/shared';

describe('Transaction', () => {
  const mockNetwork = Network.create({
    explorerUrl: 'https://explorer.mainnet.com',
    name: NetworkEnum.MAINNET,
    wsUrl: 'wss://mainnet.ws.com',
  });

  const mockAddress = { value: '0x1234567890abcdef' } as Address;
  const mockTimestamp = Timestamp.create(new Date().getTime());

  it('should create a Transaction instance', () => {
    const txType = { isBlock: false } as TxType;

    const transaction = Transaction.create({
      address: mockAddress,
      network: mockNetwork,
      timestamp: mockTimestamp,
      txType,
    });

    expect(transaction).toBeInstanceOf(Transaction);
    expect(transaction.txType).toEqual(txType);
    expect(transaction.address).toEqual(mockAddress);
    expect(transaction.network).toEqual(mockNetwork);
    expect(transaction.timestamp).toEqual(mockTimestamp);
  });

  it('should return correct block URL when txType.isBlock is true', () => {
    const txType = { isBlock: true } as TxType;

    const transaction = Transaction.create({
      address: mockAddress,
      network: mockNetwork,
      timestamp: mockTimestamp,
      txType,
    });

    const expectedUrl = `${mockNetwork.blockUrl}/${mockAddress.value}`;
    expect(transaction.url).toBe(expectedUrl);
  });

  it('should return correct transaction URL when txType.isBlock is false', () => {
    const txType = { isBlock: false } as TxType;

    const transaction = Transaction.create({
      address: mockAddress,
      network: mockNetwork,
      timestamp: mockTimestamp,
      txType,
    });

    const expectedUrl = `${mockNetwork.addressUrl}/${mockAddress.value}`;
    expect(transaction.url).toBe(expectedUrl);
  });
});
