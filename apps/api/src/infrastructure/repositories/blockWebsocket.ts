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
  execute(websocketUrl: string): void {
    const web3 = new Web3(websocketUrl);
    this.subscribeToNewBlockHeaders(web3);
  }

  private async subscribeToNewBlockHeaders(web3: Web3): Promise<void> {
    const sub = await web3.eth.subscribe('newBlockHeaders');
    sub.on('data', async (blockHeader: BlockHeaderOutput) => {
      await this.handleNewBlockHeader(web3, blockHeader);
    });
  }

  private async handleNewBlockHeader(web3: Web3, blockHeader: BlockHeaderOutput): Promise<void> {
    console.log('New block header:', blockHeader.hash);
    this.emit(TxTypesEnum.Block, PianoSound.create({
      txType: TxType.create(TxTypesEnum.Block), 
      address: Address.create(blockHeader.hash ? blockHeader.hash.toString() : ''), 
      pianoChord: PianoChord.create(PianoChordsEnum.FMajor)
    }));

    const block = await web3.eth.getBlock(blockHeader.hash, true);
    if (block && block.transactions) {
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
