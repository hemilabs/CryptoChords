import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ExpressServer } from './ExpressServer';
import { PollingRoute } from './routes/PollingRoute';
import express from 'express';

vi.mock('express', () => {
  const listenMock = vi.fn((_port, callback) => {
    callback();
    return {
      close: vi.fn((cb) => cb()),
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

  beforeEach(() => {
    pollingRouteMock = new PollingRoute();
    expressServer = new ExpressServer(pollingRouteMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should start the server correctly', async () => {
    expressServer.start();
    expect(express().listen).toHaveBeenCalled();
    expect(pollingRouteMock.initialize).toHaveBeenCalled();
  });

  it('should stop the server correctly', async () => {
    expressServer.start();
    await expressServer.stop();

    expect(pollingRouteMock.stop).toHaveBeenCalled();
  });
});
