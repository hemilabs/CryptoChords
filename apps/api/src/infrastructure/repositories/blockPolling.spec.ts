import Web3 from 'web3';
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { BlockPollingRepository } from './blockPolling';

describe('BlockPollingRepository', () => {
  let blockPollingRepository: BlockPollingRepository;
  let mockWeb3: Web3;
  let mockSetInterval: any;

  beforeEach(() => {
    blockPollingRepository = new BlockPollingRepository();
    mockWeb3 = new Web3();
    mockWeb3.eth.getBlockNumber = vi.fn().mockResolvedValue(100);
    mockWeb3.eth.getBlock = vi.fn().mockResolvedValue({
      hash: '0x14cd72d6ab1f5ffe351f3de3f956531eb7d23c365fb5c84642f2581e91abfece',
      transactions: []
    });
    mockSetInterval = vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should check for new blocks', async () => {
    await blockPollingRepository.checkNewBlocks(mockWeb3);
    expect(mockWeb3.eth.getBlockNumber).toHaveBeenCalled();
    expect(mockWeb3.eth.getBlock).toHaveBeenCalledWith(100, true);
  });
});
