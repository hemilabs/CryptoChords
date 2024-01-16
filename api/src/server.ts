import 'dotenv/config';
import express, { Express } from 'express';
import { Server as WebSocketServer } from 'ws';
import { BlockWebsocketRepository } from './infrastructure/repositories/blockWebsocket';
import { BlockPollingRepository } from './infrastructure/repositories/blockPolling';
import { PollingService } from './application/polling/pollingService';

const api: Express = express();
const port: string | number = process.env['PORT'] || 3000;

const server = api.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  ws.on('message', (message: string) => {
    console.log('Message received:', message);
  });
});

if (process.env['USE_WEBSOCKET_NODE_L2'] === 'true') {
  const blockWebsocketRepository = new BlockWebsocketRepository()
  const pollingService = new PollingService(blockWebsocketRepository)
  pollingService.execute(wss, process.env['WEBSOCKET_URL'] as string)
} else {
  const blockPollingRepository = new BlockPollingRepository()
  const pollingService = new PollingService(blockPollingRepository)
  pollingService.execute(wss, process.env['WEBSOCKET_URL'] as string)
}