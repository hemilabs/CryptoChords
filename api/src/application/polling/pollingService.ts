import { WebSocketServer } from "ws";
import { BlockRepository } from "../../domain/repositories/BlockRepository";
import BroadcastToClients from "../helpers/BroadcastToClients";
import { TxTypesEnum } from "../../domain/enums/TxTypesEnum";
import { PianoSound } from "../../domain/entities/PianoSound";

export class PollingService {
  constructor(private blockRepository: BlockRepository) {}

  execute(wss: WebSocketServer, websocketUrl: string): void {
    this.blockRepository.execute(websocketUrl)

    this.blockRepository.on(TxTypesEnum.Block, (pianoSound: PianoSound) => BroadcastToClients(wss, pianoSound));
    this.blockRepository.on(TxTypesEnum.Eth, (pianoSound: PianoSound) => BroadcastToClients(wss, pianoSound));
  }
}