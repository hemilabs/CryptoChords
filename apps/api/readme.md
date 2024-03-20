# CryptoChords Api
This is the API for CryptoChords.
It is built using DDD principles with the following layers:
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

### Install Dependencies

Once in the project directory, install the necessary dependencies:

```
npm install
```

### Start the API

```
npm run dev
```
