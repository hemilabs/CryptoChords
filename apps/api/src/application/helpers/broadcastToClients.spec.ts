/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import WebSocket, { WebSocketServer } from 'ws';
import broadcastToClients from './BroadcastToClients';

describe('BroadcastToClients', () => {
  it('should send a message to all connected clients', () => {
    const mockSend = vi.fn();
    const wss: any = new WebSocketServer({ noServer: true });
    wss.clients = new Set([
      {
        readyState: WebSocket.OPEN,
        send: mockSend,
      },
      {
        readyState: WebSocket.CLOSED,
        send: mockSend,
      },
    ]);

    const l2Block = {
      toJSON: () => ({ key: 'value' }),
    };

    broadcastToClients(wss, l2Block as any);

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(JSON.stringify({ key: 'value' }));
  });
});
