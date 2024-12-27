import { describe, it, expect } from 'vitest';
import { Network } from './Network';
import { NetworkEnum } from '../../../../../packages/shared/src/domain/enums/NetworkEnum';
import { Uuid } from '../../../../../packages/shared/src/domain/valueObjects/Uuid';

describe('Network', () => {
  const mockProps = {
    name: NetworkEnum.MAINNET,
    explorerUrl: 'https://explorer.mainnet.com',
    wsUrl: 'wss://mainnet.ws.com',
  };

  it('should create a Network instance with default UUID', () => {
    const network = Network.create(mockProps);
    expect(network).toBeInstanceOf(Network);
    expect(network.name).toBe(NetworkEnum.MAINNET);
    expect(network.explorerUrl).toBe(mockProps.explorerUrl);
    expect(network.wsUrl).toBe(mockProps.wsUrl);
    expect(network.transactionUrl).toBe(`${mockProps.explorerUrl}/tx`);
    expect(network.blockUrl).toBe(`${mockProps.explorerUrl}/block`);
  });

  it('should create a Network instance with a provided UUID', () => {
    const uuid = Uuid.create();
    const network = Network.create(mockProps, uuid);
    expect(network).toBeInstanceOf(Network);
    expect(network.name).toBe(NetworkEnum.MAINNET);
    expect(network.explorerUrl).toBe(mockProps.explorerUrl);
    expect(network.wsUrl).toBe(mockProps.wsUrl);
    expect(network.transactionUrl).toBe(`${mockProps.explorerUrl}/tx`);
    expect(network.blockUrl).toBe(`${mockProps.explorerUrl}/block`);
  });

  it('should return correct URLs for transactions and blocks', () => {
    const network = Network.create(mockProps);
    expect(network.transactionUrl).toBe(`${mockProps.explorerUrl}/tx`);
    expect(network.blockUrl).toBe(`${mockProps.explorerUrl}/block`);
  });
});
