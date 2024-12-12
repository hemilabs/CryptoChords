import { WebSocketServer } from 'ws';
import { BlockWebsocketRepository } from '../../infrastructure/repositories/blockWebsocket';
import { BlockPollingRepository } from '../../infrastructure/repositories/blockPolling';
import { PollingService } from '../../application/polling/pollingService';
import 'dotenv/config';

export class PollingRoute {
  private pollingService: PollingService;
  private url: string;

  constructor(useWebsocket: boolean, websocketUrl: string, rpcUrl: string) {
    if (useWebsocket) {
      this.url = websocketUrl;
      const blockWebsocketRepository = new BlockWebsocketRepository();
      this.pollingService = new PollingService(blockWebsocketRepository);
    } else {
      this.url = rpcUrl;
      const blockPollingRepository = new BlockPollingRepository();
      this.pollingService = new PollingService(blockPollingRepository);
    }
  }

  public initialize(wss: WebSocketServer): void {
    this.pollingService.execute(wss, this.url);
  }

  public stop(): void {
    this.pollingService.stop();
  } 
}
