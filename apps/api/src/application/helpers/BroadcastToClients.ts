import WebSocket, { WebSocketServer } from 'ws';
import { PianoSound } from '../../domain/entities/PianoSound';

const BroadcastToClients = (wss: WebSocketServer, pianoSound: PianoSound): void => {
  wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(pianoSound));
    }
  });
};

export default BroadcastToClients
