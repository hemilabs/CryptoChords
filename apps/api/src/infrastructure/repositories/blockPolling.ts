import { EventEmitter } from "stream";
import { BlockRepository } from "../../domain/repositories/BlockRepository";
import Web3 from "web3";
import { TxTypesEnum } from "../../domain/enums/TxTypesEnum";
import { PianoSound } from "../../domain/entities/PianoSound";
import { TxType } from "../../domain/valueObjects/Txtype";
import { Address } from "../../domain/valueObjects/Address";
import { PianoChord } from "../../domain/valueObjects/PianoChord";
import { PianoChordsEnum } from "../../domain/enums/PianoChordsEnum";
import { BlockTypesEnum } from "../../domain/enums/BlockTypesEnum";

export class BlockPollingRepository extends EventEmitter implements BlockRepository {
  private latestBlockNumber: bigint = BigInt(0)

  execute(websocketUrl: string, pollingInterval: number = 5000): void {
    const web3 = new Web3(websocketUrl);
    this.poll(web3, pollingInterval)
  }

  async checkNewBlocks(web3: Web3): Promise<void> {
    console.log('Checking for new block');
    const currentBlockNumber = await web3.eth.getBlockNumber();

    if (currentBlockNumber > this.latestBlockNumber) {
      this.latestBlockNumber = currentBlockNumber;

      const block = await web3.eth.getBlock(currentBlockNumber, true);
      if (block) {
        console.log('New block header:', block.hash);
        this.emit(TxTypesEnum.Block, PianoSound.create({
          txType: TxType.create(TxTypesEnum.Block), 
          address: Address.create(block.hash ? block.hash.toString() : ''), 
          pianoChord: PianoChord.create(PianoChordsEnum.FMajor)
        }));

        if (block.transactions) {
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
  }

  poll(web3: Web3, pollingInterval: number) {
    setInterval(() => this.checkNewBlocks(web3), pollingInterval);
  }
}