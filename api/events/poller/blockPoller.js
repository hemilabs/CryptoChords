const {Web3} = require('web3');
const EventEmitter = require('events');
const ResultDto = require('../../model/resultDto');
const TransactionTypes = require('../../model/transactionTypes');
const PianoNotes = require('../../model/pianoNotes');

class BlockPoller extends EventEmitter {
  constructor(web3Url, pollingInterval = 5000) {
    super();
    this.web3 = new Web3(web3Url);
    this.pollingInterval = pollingInterval;
    this.latestBlockNumber = 0;
    this.poll();
  }

  async checkNewBlocks() {
    console.log('Checking for new block');
    const currentBlockNumber = await this.web3.eth.getBlockNumber();

    if (currentBlockNumber > this.latestBlockNumber) {
      this.latestBlockNumber = currentBlockNumber;

      const block = await this.web3.eth.getBlock(currentBlockNumber, true);
      if (block) {
        console.log('New block header:', block.hash);
        this.emit('newBlock', new ResultDto('block', block.hash, PianoNotes.A));

        if (block.transactions) {
          block.transactions.forEach((tx) => {
            if (tx.type.toString() === TransactionTypes.EIP1559) {
              console.log('New eth tx from', tx.from);
              this.emit('newEthTransaction', new ResultDto('ethTx', tx.from, PianoNotes.A));
            }
          });
        }
      }
    }
  }

  poll() {
    setInterval(() => this.checkNewBlocks(), this.pollingInterval);
  }
}

module.exports = BlockPoller;
