import { WebSocketServer } from "ws";
import { BlockRepository } from "../../domain/repositories/BlockRepository";
import BroadcastToClients from "../helpers/BroadcastToClients";
import { TxTypesEnum } from "../../domain/enums/TxTypesEnum";
import { L2Block } from "../../domain/entities/L2Block";
export class PollingService {
  constructor(private blockRepository: BlockRepository) {}

  execute(wss: WebSocketServer, websocketUrl: string): void {
    this.blockRepository.execute(websocketUrl)

    this.blockRepository.on(TxTypesEnum.Block, (l2Block: L2Block) => BroadcastToClients(wss, l2Block));
    this.blockRepository.on(TxTypesEnum.Eth, (l2Block: L2Block) => BroadcastToClients(wss, l2Block));
  }

  stop() {
    this.blockRepository.stop()
  }
}