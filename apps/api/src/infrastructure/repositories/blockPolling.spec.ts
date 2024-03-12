import Web3 from 'web3';
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { BlockTypesEnum } from '../../domain/enums/BlockTypesEnum';
import { BlockPollingRepository } from './blockPolling';

vi.mock('@cryptochords/shared', () => ({
  TxType: {
    create: vi.fn().mockReturnValue({}),
  },
  TxTypesEnum: {
    Block: 'Block',
    Eth: 'Eth',
  },
  Address: {
    create: vi.fn().mockReturnValue({}),
  },
  L2Block: {
    create: vi.fn().mockReturnValue({}),
  },
}));

describe('BlockPollingRepository', () => {
  let blockPollingRepository: BlockPollingRepository;
  let mockWeb3: Web3;

  beforeEach(() => {
    blockPollingRepository = new BlockPollingRepository();
    mockWeb3 = new Web3();
    mockWeb3.eth.getBlockNumber = vi.fn().mockResolvedValue(100);
    mockWeb3.eth.getBlock = vi.fn().mockResolvedValue({
      hash: '0xhash',
      transactions: [],
    });
    vi.useFakeTimers();

    vi.spyOn(blockPollingRepository, 'emit');
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should start and stop polling correctly', () => {
    blockPollingRepository.execute('http://localhost:8545', 1000);
    expect(vi.getTimerCount()).toBe(1);
    blockPollingRepository.stop();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('should emit "Block" event for new blocks with no transactions', async () => {
    await blockPollingRepository.checkNewBlocks(mockWeb3);
    expect(blockPollingRepository.emit).toHaveBeenCalledWith('Block', expect.anything());
  });

  it('should emit "Block" and "Eth" events for new blocks with EIP1559 transactions', async () => {
    mockWeb3.eth.getBlock = vi.fn().mockResolvedValue({
      hash: '0xnewhash',
      transactions: [
        { type: BlockTypesEnum.EIP1559, from: '0xSomeAddress' },
      ],
    });

    await blockPollingRepository.checkNewBlocks(mockWeb3);
    expect(blockPollingRepository.emit).toHaveBeenCalledWith('Block', expect.anything());
    expect(blockPollingRepository.emit).toHaveBeenCalledWith('Eth', expect.anything());
  });
});
