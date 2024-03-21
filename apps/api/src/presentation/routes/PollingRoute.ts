import { WebSocketServer } from 'ws';
import { BlockWebsocketRepository } from '../../infrastructure/repositories/blockWebsocket';
import { BlockPollingRepository } from '../../infrastructure/repositories/blockPolling';
import { PollingService } from '../../application/polling/pollingService';
import 'dotenv/config';

export class PollingRoute {
  private pollingService: PollingService;
  private url: string;

  constructor() {
    if (process.env['USE_WEBSOCKET_NODE_L2'] === 'true') {
      this.url = process.env['WEBSOCKET_URL'] as string
      const blockWebsocketRepository = new BlockWebsocketRepository();
      this.pollingService = new PollingService(blockWebsocketRepository);
    } else {
      this.url = process.env['RPC_URL'] as string
      const blockPollingRepository = new BlockPollingRepository();
      this.pollingService = new PollingService(blockPollingRepository);
    }
  }

  public initialize(wss: WebSocketServer): void {
    this.pollingService.execute(wss, this.url);
  }

  public stop(): void {
    this.pollingService.stop()
  } 
}
