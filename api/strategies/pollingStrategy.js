const BlockPoller = require('../events/poller/blockPoller');
const {broadcastToClients} = require('../helpers/broadcastToClients');

const initializePollingStrategy = (wss, rpcUrl) => {
  const blockPoller = new BlockPoller(rpcUrl);
  console.log('Connected to the node L2 through polling strategy');

  blockPoller.on('newBlock', (block) => broadcastToClients(wss, {...block}));
  blockPoller.on('newEthTransaction', (ethTx) => broadcastToClients(wss, {...ethTx}));
};

module.exports = initializePollingStrategy;
