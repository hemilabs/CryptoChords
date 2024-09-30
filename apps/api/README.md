# CryptoChords Api

CryptoChords is an API developed using Domain-Driven Design (DDD) principles to facilitate interaction with the Hemi network. This document provides instructions for setting up, running, and contributing to the project.

## Architecture

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

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Install the dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

### Running the Project

1. On the root folder, run the following command:

```bash
npm run dev
```

### Running the Tests

To run the tests, you can use the following command:

```bash
npm run test
```

### Lint the Code

```bash
npm run lint
```

### Test the Code Coverage

```bash
npm run test:cov
```

### Environment Variables

The environment variables are defined in the `.env` file. The following variables are used:

- `RPC_URL`: The RPC (Remote Procedure Call) URL of the Hemi network.[Hemi Docs](https://github.com/hemilabs/infrastructure/blob/main/NETWORK_INFO.md).

- `WEBSOCKET_URL`: The Websocket URL of the Hemi network.[Hemi Docs](https://github.com/hemilabs/infrastructure/blob/main/NETWORK_INFO.md).

- `USE_WEBSOCKET_NODE_L2`: A boolean that indicates if the API uses the WebSocket port (default is true).[Hemi Docs](https://github.com/hemilabs/infrastructure/blob/main/NETWORK_INFO.md).

Example of the .env file

```
RPC_URL=https://testnet.rpc.hemi.network/rpc
WEBSOCKET_URL=wss://testnet.rpc.hemi.network/wsrpc
USE_WEBSOCKET_NODE_L2=true
```

## Contribution
If you want to contribute to this project and make it better, your help is very welcome.
You can find more information about how to contribute in the [`CONTRIBUTING.md`](../../CONTRIBUTING.md) file.

## License
This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
