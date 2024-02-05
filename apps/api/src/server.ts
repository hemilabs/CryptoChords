import 'dotenv/config';
import { ExpressServer } from './presentation/ExpressServer';
import { PollingRoute } from './presentation/routes/PollingRoute';

// Routes
const pollingRoute = new PollingRoute()

const server = new ExpressServer(pollingRoute)

const startServer = async (): Promise<void> => {
  await server.start()
}

const stopServer = async (): Promise<void> => {
  await server.stop()
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
