import { WebSocketServer } from 'ws';
import { BlockWebsocketRepository } from '../../infrastructure/repositories/blockWebsocket';
import { BlockPollingRepository } from '../../infrastructure/repositories/blockPolling';
import { PollingService } from '../../application/polling/pollingService';
import 'dotenv/config';

export class PollingRoute {
  private pollingService: PollingService;

  constructor() {
    if (process.env['USE_WEBSOCKET_NODE_L2'] === 'true') {
      const blockWebsocketRepository = new BlockWebsocketRepository();
      this.pollingService = new PollingService(blockWebsocketRepository);
    } else {
      const blockPollingRepository = new BlockPollingRepository();
      this.pollingService = new PollingService(blockPollingRepository);
    }
  }

  public initialize(wss: WebSocketServer): void {
    this.pollingService.execute(wss, process.env['WEBSOCKET_URL'] as string);
  }

  public stop(): void {
    this.pollingService.stop()
  } 
}
