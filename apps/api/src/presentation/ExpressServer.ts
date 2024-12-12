import express, { Express } from 'express';
import { Server as HTTPServer } from 'http';
import { Server as WebSocketServer } from 'ws';
import 'dotenv/config';
import { PollingRoute } from './routes/PollingRoute';

export class ExpressServer {
  private pollingRoute: PollingRoute;
  private api: Express;
  private httpServer: HTTPServer | null = null;
  private wss: WebSocketServer | null = null;
  private port: string | number;

  constructor(pollingRoute: PollingRoute, port: number) {
    this.pollingRoute = pollingRoute;
    this.api = express();
    this.port = port || 3000;
  }

  public start(): void {
    this.httpServer = this.api.listen(this.port, () => {
      console.log(`Express server running on port ${this.port}`);
    });

    this.wss = new WebSocketServer({ server: this.httpServer });

    this.wss.on('connection', (ws) => {
      console.log('WebSocket client connected');
      ws.on('message', (message: string) => {
        console.log('Message received:', message);
      });
    });

    this.pollingRoute.initialize(this.wss);
  }

  async stop(): Promise<void> {
    console.info('CryptoChords API | Closing HTTP Server')

    return await new Promise((resolve) => {
      this.httpServer?.close((error) => {
        if (error) {
          console.error(
            `CryptoChords API | Error Closing HTTP Server: ${error.message}`)
        } else {
          this.wss = null;
          console.info('CryptoChords API | WSS Server successfully closed');
        }
        this.pollingRoute.stop()
        resolve()
      })
    })
  }
}
