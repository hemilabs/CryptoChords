import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WebSocketServer } from 'ws';
import { PollingRoute } from './PollingRoute';
import { HemiTestnet } from '@cryptochords/shared';

vi.mock('../../application/polling/pollingService', () => {
  return {
    PollingService: vi.fn().mockImplementation(() => ({
      execute: vi.fn(),
      stop: vi.fn(),
    })),
  };
});

vi.mock('ws');
vi.mock('../../infrastructure/repositories/blockWebsocket', () => ({
  BlockWebsocketRepository: vi.fn(),
}));
vi.mock('../../infrastructure/repositories/blockPolling', () => ({
  BlockPollingRepository: vi.fn(),
}));

describe('PollingRoute', () => {
  let wss: WebSocketServer;

  const MOCK_WEBSOCKET_URL = HemiTestnet.rpcUrls.default.webSocket[0];
  const MOCK_RPC_URL = HemiTestnet.rpcUrls.default.http[0];

  beforeEach(() => {
    vi.clearAllMocks();
    wss = new WebSocketServer({ noServer: true });
  });

  it('should initialize with WebSocket when useWebsocket is true', () => {
    const pollingRoute = new PollingRoute(true, MOCK_WEBSOCKET_URL, MOCK_RPC_URL);
    pollingRoute.initialize(wss);

    const mockPollingService = pollingRoute['pollingService'] as any;
    expect(mockPollingService.execute).toHaveBeenCalledWith(wss, MOCK_WEBSOCKET_URL);
  });

  it('should initialize with Polling when useWebsocket is false', () => {
    const pollingRoute = new PollingRoute(false, MOCK_WEBSOCKET_URL, MOCK_RPC_URL);
    pollingRoute.initialize(wss);

    const mockPollingService = pollingRoute['pollingService'] as any;
    expect(mockPollingService.execute).toHaveBeenCalledWith(wss, MOCK_RPC_URL);
  });
});
