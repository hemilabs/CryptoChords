import { WebSocketServer } from 'ws';
import { BlockRepository } from '../../domain/repositories/BlockRepository';
import broadcastToClients from '../helpers/BroadcastToClients';
import { TxTypesEnum } from '@cryptochords/shared';
import { L2Block } from '@cryptochords/shared';
export class PollingService {
  constructor(private blockRepository: BlockRepository) {}

  execute(wss: WebSocketServer, url: string): void {
    this.blockRepository.execute(url);

    this.blockRepository.on(TxTypesEnum.Block, (l2Block: L2Block) =>
      broadcastToClients(wss, l2Block),
    );
    this.blockRepository.on(TxTypesEnum.Eth, (l2Block: L2Block) =>
      broadcastToClients(wss, l2Block),
    );
  }

  stop() {
    this.blockRepository.stop();
  }
}
