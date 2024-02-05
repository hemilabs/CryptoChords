import Web3, { BlockHeaderOutput } from 'web3';
import { EventEmitter } from 'events';
import { PianoSound } from '../../domain/entities/PianoSound';
import { TxType } from '../../domain/valueObjects/Txtype';
import { TxTypesEnum } from '../../domain/enums/TxTypesEnum';
import { Address } from '../../domain/valueObjects/Address';
import { PianoChord } from '../../domain/valueObjects/PianoChord';
import { PianoChordsEnum } from '../../domain/enums/PianoChordsEnum';
import { BlockTypesEnum } from '../../domain/enums/BlockTypesEnum';
import { BlockRepository } from '../../domain/repositories/BlockRepository';

export class BlockWebsocketRepository extends EventEmitter implements BlockRepository {
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
      console.error('Web3 is not initialized.');
      return;
    }

    this.subscription = await this.web3?.eth.subscribe('newBlockHeaders');
    this.subscription.on('data', async (blockHeader: BlockHeaderOutput) => {
      await this.handleNewBlockHeader(this.web3, blockHeader);
    });
  }

  private async handleNewBlockHeader(web3: Web3 | null, blockHeader: BlockHeaderOutput): Promise<void> {
    console.log('New block header:', blockHeader.hash);
    this.emit(TxTypesEnum.Block, PianoSound.create({
      txType: TxType.create(TxTypesEnum.Block), 
      address: Address.create(blockHeader.hash ? blockHeader.hash.toString() : ''), 
      pianoChord: PianoChord.create(PianoChordsEnum.FMajor)
    }));

    const block = await web3?.eth.getBlock(blockHeader.hash, true);
    if (block && block.transactions) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      block.transactions.forEach((tx: any) => {
        if (tx.type.toString() === BlockTypesEnum.EIP1559) {
          console.log('New eth tx from', tx.from);
          this.emit(TxTypesEnum.Eth, PianoSound.create({
            txType: TxType.create(TxTypesEnum.Eth), 
            address: Address.create(tx.from), 
            pianoChord: PianoChord.create(PianoChordsEnum.CMajor)
          }));
        }
      });
    }
  }
}
