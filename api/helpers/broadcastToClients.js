const WebSocket = require('ws');

const broadcastToClients = (wss, message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

module.exports = {broadcastToClients};
