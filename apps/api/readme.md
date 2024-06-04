# CryptoChords Api

CryptoChords is an API developed using Domain-Driven Design (DDD) principles to facilitate interaction with the Hemisphere network. This document provides instructions for setting up, running, and contributing to the project.

### Architecture

The API is organized into the following layers:

- Application
- Domain
- Infrastructure
- Presentation

## Application

This layer contains the use cases of the application. It is the entry point of the application and it is responsible for coordinating the domain layer and the infrastructure layer.

## Domain

This layer contains the business logic of the application. It is the core of the application and it is responsible for the entities, value objects, and domain services.

## Infrastructure

This layer contains the implementation of the application. It is responsible for the database and the external services.

## Presentation

This layer contains the user interface of the application.

#### Environment Variables

The environment variables are defined in the `.env` file. The following variables are used:

- `RPC_URL`: The RPC (Remove Procedure Call) URL of the Hemisphere network.[Hemisphere Docs](https://github.com/hemilabs/infrastructure/blob/main/NETWORK_INFO.md).

- `WEBSOCKET_URL`: The Websocket URL of the Hemisphere network.[Hemisphere Docs](https://github.com/hemilabs/infrastructure/blob/main/NETWORK_INFO.md).

- `USE_WEBSOCKET_NODE_L2`: A boolean that indicates if the API uses the WebSocket port (default is true).[Hemisphere Docs](https://github.com/hemilabs/infrastructure/blob/main/NETWORK_INFO.md).

Example of the .env file

```
RPC_URL=https://testnet.rpc.hemi.network/rpc
WEBSOCKET_URL=wss://testnet.rpc.hemi.network/wsrpc
USE_WEBSOCKET_NODE_L2=true
```

### Install Dependencies

Once in the project directory, install the necessary dependencies:

```
npm install
```

### Start the API

```
npm run dev
```

### Run Linter

```
npm run lint
```

### Test the API

```
npm run test
```

### Check the Test Coverage Stats

```
npm run test:cov
```

### Build the API

```
npm run build
```

### Contribution

If you want to contribute to this project and make it better, your help is very welcome.

1. Fork the project
2. Create a new branch for your feature (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Create a new Pull Request

Please, make sure your code is well tested. Also, run the tests and the linter before opening a Pull Request.