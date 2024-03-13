import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BlockTypesEnum } from '../../domain/enums/BlockTypesEnum';
import { BlockWebsocketRepository } from './blockWebsocket';

vi.mock('web3', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => ({
    eth: {
      subscribe: vi.fn().mockImplementation(() => Promise.resolve({
        on: vi.fn((event, callback) => {
          if (event === 'data') {
            const fakeBlockHeader = { hash: 'fakeHash' };
            callback(fakeBlockHeader);
          }
        }),
        unsubscribe: vi.fn(),
      })),
      getBlock: vi.fn().mockResolvedValue({
        transactions: [{ type: BlockTypesEnum.EIP1559, from: 'fakeAddress' }],
      }),
    },
  })),
}));

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

describe('BlockWebsocketRepository', () => {
  let blockWebsocketRepository: BlockWebsocketRepository;

  beforeEach(() => {
    blockWebsocketRepository = new BlockWebsocketRepository();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize and subscribe to new block headers', async () => {
    blockWebsocketRepository.execute('fakeWebsocketUrl');
    await vi.waitFor(() => {
      expect(blockWebsocketRepository['subscription']).toBeDefined();
      expect(blockWebsocketRepository['web3']).toBeDefined();
      expect(blockWebsocketRepository['subscription'].on).toHaveBeenCalledWith('data', expect.any(Function));
    });
  });

  it('should stop subscription', async () => {
    blockWebsocketRepository.execute('fakeWebsocketUrl');
    await vi.waitFor(() => expect(blockWebsocketRepository['subscription']).toBeDefined());

    blockWebsocketRepository.stop();
    expect(blockWebsocketRepository['subscription']).toBeNull();
  });

  it('should emit events for new block headers and transactions', async () => {
    const emitSpy = vi.spyOn(blockWebsocketRepository, 'emit');
    blockWebsocketRepository.execute('fakeWebsocketUrl');

    await vi.waitFor(() => expect(emitSpy).toHaveBeenCalledWith('Block', expect.anything()));
    await vi.waitFor(() => expect(emitSpy).toHaveBeenCalledWith('Eth', expect.anything()), { timeout: 500 });

    expect(emitSpy).toHaveBeenNthCalledWith(1, 'Block', expect.anything());
    expect(emitSpy).toHaveBeenNthCalledWith(2, 'Eth', expect.anything());
  });
});
