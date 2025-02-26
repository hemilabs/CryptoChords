import Web3, { BlockHeaderOutput, WebSocketProvider } from 'web3';
import { EventEmitter } from 'events';
import { TxType } from '@cryptochords/shared';
import { TxTypesEnum } from '@cryptochords/shared';
import { Address } from '@cryptochords/shared';
import { BlockTypesEnum } from '../../domain/enums/BlockTypesEnum';
import { BlockRepository } from '../../domain/repositories/BlockRepository';
import { L2Block } from '@cryptochords/shared';

export class BlockWebsocketRepository
  extends EventEmitter
  implements BlockRepository
{
  private web3: Web3 | null = null;
  private provider: WebSocketProvider | null = null;
  private websocketUrl!: string;
  private noDataTolerance!: number;
  private lastBlockTimestamp: number = 0;
  private connectionTimestamp: number = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private subscription: any | null = null;

  execute(websocketUrl: string, noDataTolerance: number = 30_000): void {
    this.websocketUrl = websocketUrl;
    this.noDataTolerance = noDataTolerance;
    this.connect();
  }

  connect(): void {
    console.log('Trying to connect..');
    this.web3 = new Web3(this.getProvider());
  }

  keepAlive(): void {
    const intervalId = setInterval(() => {
      if (this.connectionTimestamp == 0) {
        return;
      }

      const referenceTimestamp = Math.max(
        this.connectionTimestamp,
        this.lastBlockTimestamp,
      );

      const timeSinceLastData = Date.now() - referenceTimestamp;

      if (timeSinceLastData > this.noDataTolerance) {
        console.log('No data received for too long, reconnecting');
        clearInterval(intervalId);
        this.reconnect();
        return;
      }
    }, this.noDataTolerance / 4);
  }

  getProvider() {
    if (this.provider) {
      return this.provider;
    }

    this.provider = new WebSocketProvider(this.websocketUrl);
    this.provider.once('error', this.handleConnectionError.bind(this));
    this.provider.once('end', this.handleConnectionEnd.bind(this));
    this.provider.once('connect', this.handleConnection.bind(this));
    return this.provider;
  }

  handleConnectionError(): void {
    console.log('Connection error');
    this.reconnect();
  }

  handleConnectionEnd(): void {
    console.log('Connection ended');
    this.reconnect();
  }

  handleConnection(): void {
    console.log('Connected to websocket');
    this.connectionTimestamp = Date.now();
    this.subscribeToNewBlockHeaders();
    this.keepAlive();
  }

  reconnect(delay: number = 10_000): void {
    console.log('Reconnecting in', delay, 'ms');
    this.stop();
    setTimeout(() => this.connect(), delay);
  }

  stop(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (this.provider) {
      this.provider.removeAllListeners('connect');
      this.provider.removeAllListeners('error');
      this.provider.removeAllListeners('end');
      this.provider = null;
    }

    if (this.web3) {
      this.web3.removeAllListeners();
      this.web3 = null;
    }

    this.connectionTimestamp = 0;
  }

  private async subscribeToNewBlockHeaders(): Promise<void> {
    if (!this.web3) {
      return;
    }

    this.subscription = await this.web3.eth.subscribe('newBlockHeaders');
    this.subscription.on('data', async (blockHeader: BlockHeaderOutput) => {
      await this.handleNewBlockHeader(this.web3, blockHeader);
    });
  }

  private async handleNewBlockHeader(
    web3: Web3 | null,
    blockHeader: BlockHeaderOutput,
  ): Promise<void> {
    this.lastBlockTimestamp = Date.now();
    this.emit(
      TxTypesEnum.Block,
      L2Block.create({
        address: Address.create(
          blockHeader.hash ? blockHeader.hash.toString() : '',
        ),
        txType: TxType.create(TxTypesEnum.Block),
      }),
    );

    const block = await web3?.eth.getBlock(blockHeader.hash, true);
    if (block && block.transactions) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      block.transactions.forEach((tx: any) => {
        if (tx.type.toString() === BlockTypesEnum.EIP1559) {
          this.emit(
            TxTypesEnum.Eth,
            L2Block.create({
              address: Address.create(tx.from),
              txType: TxType.create(TxTypesEnum.Eth),
            }),
          );
        }
      });
    }
  }
}
