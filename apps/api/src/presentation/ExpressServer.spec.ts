import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ExpressServer } from './ExpressServer';
import { PollingRoute } from './routes/PollingRoute';
import express from 'express';
import { HemiTestnet } from '@cryptochords/shared';

vi.mock('express', () => {
  const listenMock = vi.fn((_port, callback) => {
    callback();
    return {
      close: vi.fn((cb) => cb && cb()),
    };
  });
  return {
    __esModule: true,
    default: vi.fn(() => ({
      listen: listenMock,
    })),
  };
});

vi.mock('ws', () => ({
  Server: vi.fn().mockImplementation(() => ({
    on: vi.fn(),
  })),
}));

vi.mock('./routes/PollingRoute', () => ({
  PollingRoute: vi.fn().mockImplementation(() => ({
    initialize: vi.fn(),
    stop: vi.fn(),
  })),
}));

describe('ExpressServer', () => {
  let expressServer: ExpressServer;
  let pollingRouteMock: PollingRoute;

  const MOCK_PORT = 3000;
  const USE_WEBSOCKET = true;
  const MOCK_WEBSOCKET_URL = HemiTestnet.rpcUrls.default.webSocket[0];
  const MOCK_RPC_URL = HemiTestnet.rpcUrls.default.http[0];

  beforeEach(() => {
    vi.clearAllMocks();

    pollingRouteMock = new PollingRoute(USE_WEBSOCKET, MOCK_WEBSOCKET_URL, MOCK_RPC_URL);
    expressServer = new ExpressServer(pollingRouteMock, MOCK_PORT);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should start the server correctly', () => {
    expressServer.start();

    const mockedExpress = express() as any;
    expect(mockedExpress.listen).toHaveBeenCalledWith(MOCK_PORT, expect.any(Function));
    expect(pollingRouteMock.initialize).toHaveBeenCalled();
  });

  it('should stop the server correctly', async () => {
    expressServer.start();
    await expressServer.stop();

    expect(pollingRouteMock.stop).toHaveBeenCalled();
  });
});
