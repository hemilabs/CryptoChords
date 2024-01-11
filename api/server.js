require('dotenv').config();
const express = require('express');
const {Server: WebSocketServer} = require('ws');
const initializeWebsocketStrategy = require('./strategies/websocketStrategy');
const initializePollingStrategy = require('./strategies/pollingStrategy');

const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

const wss = new WebSocketServer({server});

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  ws.on('message', (message) => {
    console.log('Message received:', message);
  });
});

if (process.env.USE_WEBSOCKET_NODE_L2 === 'true') {
  initializeWebsocketStrategy(wss, process.env.WEBSOCKET_URL);
} else {
  initializePollingStrategy(wss, process.env.RPC_URL);
}
