import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WebSocketServer } from 'ws';
import { EventEmitter } from 'events';
import broadcastToClients from '../helpers/BroadcastToClients';
import { TxTypesEnum } from '@cryptochords/shared';
import { PollingService } from './pollingService';

vi.mock('ws');
vi.mock('../helpers/BroadcastToClients', () => ({
  __esModule: true,
  default: vi.fn(),
}));

class MockBlockRepository extends EventEmitter {
  execute = vi.fn();
  stop = vi.fn();
}

describe('PollingService', () => {
  let pollingService: PollingService;
  let mockBlockRepository: MockBlockRepository;
  let mockWss: WebSocketServer;

  beforeEach(() => {
    mockBlockRepository = new MockBlockRepository();
    mockWss = new WebSocketServer({ noServer: true });
    pollingService = new PollingService(mockBlockRepository);
  });

  it('should execute and handle Block and Eth events', () => {
    const websocketUrl = 'ws://test.url';
    const mockL2Block = { key: 'Value' };

    pollingService.execute(mockWss, websocketUrl);

    expect(mockBlockRepository.execute).toHaveBeenCalledWith(websocketUrl);

    mockBlockRepository.emit(TxTypesEnum.Block, mockL2Block);
    mockBlockRepository.emit(TxTypesEnum.Eth, mockL2Block);

    expect(broadcastToClients).toHaveBeenCalledWith(mockWss, mockL2Block);
    expect(broadcastToClients).toHaveBeenCalledTimes(2);
  });

  it('should stop the repository on stop', () => {
    pollingService.stop();
    expect(mockBlockRepository.stop).toHaveBeenCalled();
  });
});
