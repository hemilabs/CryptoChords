const {Web3} = require('web3');
const EventEmitter = require('events');
const ResultDto = require('../../model/resultDto');
const TransactionTypes = require('../../model/transactionTypes');
const PianoNotes = require('../../model/pianoNotes');

class BlockWebsocket extends EventEmitter {
  constructor(websocketUrl) {
    super();
    this.web3 = new Web3(websocketUrl);
    this.subscribeToNewBlockHeaders();
  }

  async subscribeToNewBlockHeaders() {
    const sub = await this.web3.eth.subscribe('newBlockHeaders');
    sub.on('data', async (blockHeader) => {
      await this.handleNewBlockHeader(blockHeader);
    });
  }

  async handleNewBlockHeader(blockHeader) {
    console.log('New block header:', blockHeader.hash);
    this.emit('newBlock', new ResultDto('block', blockHeader.hash, PianoNotes.A));

    const block = await this.web3.eth.getBlock(blockHeader.hash, true);
    if (block && block.transactions) {
      block.transactions.forEach((tx) => {
        if (tx.type.toString() === TransactionTypes.EIP1559) {
          console.log('New eth tx from', tx.from);
          this.emit('newEthTransaction', new ResultDto('ethTx', tx.from, PianoNotes.A));
        }
      });
    }
  }
}

module.exports = BlockWebsocket;
