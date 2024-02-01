require('dotenv').config();
import Web3 from 'web3';
import { beforeEach, describe, it, vi } from 'vitest';
import { BlockWebsocketRepository } from './blockWebsocket';

describe('BlockWebsocketRepository', () => {
  let blockWebsocketRepository: BlockWebsocketRepository;
  let mockWeb3: Web3;

  beforeEach(() => {
    blockWebsocketRepository = new BlockWebsocketRepository();
    mockWeb3 = new Web3();
    vi.spyOn(mockWeb3.eth, 'subscribe').mockImplementation(async () : Promise<any> => {
    });
  });

  it('should subscribe to new block headers', async () => {
    await blockWebsocketRepository.execute(process.env['WEBSOCKET_URL'] as string);
  });
});

