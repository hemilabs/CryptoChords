import Web3, { BlockHeaderOutput } from 'web3';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private subscription: any | null = null;

  execute(websocketUrl: string): void {
    this.web3 = new Web3(websocketUrl);
    this.subscribeToNewBlockHeaders();
  }

  stop(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private async subscribeToNewBlockHeaders(): Promise<void> {
    if (!this.web3) {
      return;
    }

    this.subscription = await this.web3?.eth.subscribe('newBlockHeaders');
    this.subscription.on('data', async (blockHeader: BlockHeaderOutput) => {
      await this.handleNewBlockHeader(this.web3, blockHeader);
    });
  }

  private async handleNewBlockHeader(
    web3: Web3 | null,
    blockHeader: BlockHeaderOutput,
  ): Promise<void> {
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
