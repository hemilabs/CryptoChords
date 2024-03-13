import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WebSocketServer } from 'ws';
import { PollingRoute } from './PollingRoute';

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
  BlockWebsocketRepository: vi.fn().mockImplementation(() => ({})),
}));
vi.mock('../../infrastructure/repositories/blockPolling', () => ({
  BlockPollingRepository: vi.fn().mockImplementation(() => ({})),
}));

describe('PollingRoute', () => {
  let wss: WebSocketServer;

  beforeEach(() => {
    vi.clearAllMocks();
    wss = new WebSocketServer({ noServer: true });
  });

  it('should correctly initialize with WebSocket or Polling based on environment variable', async () => {
    process.env['USE_WEBSOCKET_NODE_L2'] = 'true';
    let pollingRoute = new PollingRoute();
    pollingRoute.initialize(wss);
    expect(vi.mocked(pollingRoute['pollingService'].execute)).toHaveBeenCalled();

    vi.clearAllMocks();

    delete process.env['USE_WEBSOCKET_NODE_L2'];
    pollingRoute = new PollingRoute();
    pollingRoute.initialize(wss);

    expect(vi.mocked(pollingRoute['pollingService'].execute)).toHaveBeenCalled();
  });
});
