const BlockWebsocket = require('../events/websocket/blockWebsocket');
const {broadcastToClients} = require('../helpers/broadcastToClients');

const initializeWebsocketStrategy = (wss, websocketUrl) => {
  const blockWebsocket = new BlockWebsocket(websocketUrl);
  console.log('Connected to the node L2 through websocket strategy');

  blockWebsocket.on('newBlock', (block) => broadcastToClients(wss, {...block}));
  blockWebsocket.on('newEthTransaction', (ethTx) => broadcastToClients(wss, {...ethTx}));
};

module.exports = initializeWebsocketStrategy;
