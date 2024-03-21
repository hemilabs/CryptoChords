import { EventEmitter } from "stream";
import { BlockRepository } from "../../domain/repositories/BlockRepository";
import Web3 from "web3";
import { TxTypesEnum } from "@cryptochords/shared";
import { TxType } from "@cryptochords/shared";
import { Address } from "@cryptochords/shared";
import { BlockTypesEnum } from "../../domain/enums/BlockTypesEnum";
import { L2Block } from "@cryptochords/shared";

export class BlockPollingRepository extends EventEmitter implements BlockRepository {
  private latestBlockNumber = BigInt(0)
  private pollingIntervalId: NodeJS.Timeout | null = null;

  execute(rpcUrl: string, pollingInterval = 5000): void {
    const web3 = new Web3(rpcUrl);
    this.poll(web3, pollingInterval)
  }

  stop() {
    if (this.pollingIntervalId) {
      clearInterval(this.pollingIntervalId);
      this.pollingIntervalId = null;
    }
    console.log('Polling stopped.');
  }

  async checkNewBlocks(web3: Web3): Promise<void> {
    console.log('Checking for new block');
    const currentBlockNumber = await web3.eth.getBlockNumber();

    if (currentBlockNumber > this.latestBlockNumber) {
      this.latestBlockNumber = currentBlockNumber;

      const block = await web3.eth.getBlock(currentBlockNumber, true);
      if (block) {
        console.log('New block header:', block.hash);
        this.emit(TxTypesEnum.Block, L2Block.create({
          txType: TxType.create(TxTypesEnum.Block), 
          address: Address.create(block.hash ? block.hash.toString() : '')
        }));

        if (block.transactions) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          block.transactions.forEach((tx: any) => {
            if (tx.type.toString() === BlockTypesEnum.EIP1559) {
              console.log('New eth tx from', tx.from);
              this.emit(TxTypesEnum.Eth, L2Block.create({
                txType: TxType.create(TxTypesEnum.Eth), 
                address: Address.create(tx.from)
              }));
            }
          });
        }
      }
    }
  }

  poll(web3: Web3, pollingInterval: number) {
    this.pollingIntervalId = setInterval(() => this.checkNewBlocks(web3), pollingInterval);
  }
}
