import 'dotenv/config';
import { ExpressServer } from './presentation/ExpressServer';
import { PollingRoute } from './presentation/routes/PollingRoute';
import { HemiTestnet, HemiMainnet } from "@cryptochords/shared";

const useWebsocket = process.env['USE_WEBSOCKET_NODE_L2'] === 'true'
const useMainnet = process.env['ENABLE_MAINNET'] === 'true'
// Testnet
const websocketTestnet = HemiTestnet.rpcUrls.default.webSocket[0]
const rpcTestnet = HemiTestnet.rpcUrls.default.http[0]
const pollingRouteTestnet = new PollingRoute(useWebsocket, websocketTestnet, rpcTestnet)
const serverTestnet = new ExpressServer(pollingRouteTestnet, 3000)
// Mainnet
const websocketMainnet = HemiMainnet.rpcUrls.default.webSocket[0]
const rpcMainnet = HemiMainnet.rpcUrls.default.http[0]
const pollingRouteMainnet = new PollingRoute(useWebsocket, websocketMainnet, rpcMainnet)
const serverMainnet = new ExpressServer(pollingRouteMainnet, 3001)

const startServer = async (): Promise<void> => {
  await serverTestnet.start()
  if (useMainnet) {
    await serverMainnet.start()
  }
}

const stopServer = async (): Promise<void> => {
  await serverTestnet.stop()
  if (useMainnet) {
    await serverMainnet.stop()
  }
}

process.on('SIGTERM', async () => {
  await stopServer()
  process.exit(0);
})

process.on('SIGINT', async () => {
  await stopServer()
  process.exit(0);
})

startServer()
