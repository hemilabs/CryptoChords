# CryptoChords Web App

This is the web application of the CryptoChords project. It is a front-end application that allows users to visualize activities on the [Hemi network](https://hemi.xyz).

## Architecture

It is built using DDD principles with the following layers:

- Application
- Domain
- Infrastructure
- Presentation

### Application

This layer contains the use cases of the application. It is the entry point of the application and it is responsible for coordinating the domain layer and the infrastructure layer.

### Domain

This layer contains the business logic of the application. It is the core of the application and it is responsible for the entities, value objects, and domain services.

### Infrastructure

This layer contains the implementation of the application. It is responsible for the database and the external services.

### Presentation

This layer contains the user interface of the application.

#### Presenters

This sublayer contains the presenters of the application. It is responsible for the whole user interface logic.

#### React

This sublayer contains the React implementation of the application. Its components are responsible for the style and the interface with the presenters, displaying its state and redirecting the user actions.

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

2. Open your browser and access the URL provided in the terminal. Normally, it is `http://localhost:5173/`.

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

- `VITE_TESTNET_API_WEBSERVICE_URL`: The URL of the testnet web service API. If the variable contains the value `${host}` it will be replaced by the host of the web app. Make sure to escape the dollar sign `\${host}` otherwise it will expanded using [dotenv-expand](https://github.com/motdotla/dotenv-expand) as described on [Vite Docs](https://vitejs.dev/guide/env-and-mode#env-files).

- `VITE_MAINNET_API_WEBSERVICE_URL`: The URL of the mainnet web service API. If the variable contains the value `${host}` it will be replaced by the host of the web app. Make sure to escape the dollar sign `\${host}` otherwise it will expanded using [dotenv-expand](https://github.com/motdotla/dotenv-expand) as described on [Vite Docs](https://vitejs.dev/guide/env-and-mode#env-files).

- `VITE_USE_API_MOCK`: A boolean that indicates if the API should be mocked.

- `VITE_GITHUB_URL`: The URL of the GitHub repository. Used in the header and footer.

- `VITE_CONTRIBUTORS_URL`: The URL of the contributors file. Used in the header.

- `VITE_FEEDBACK_URL`: The URL of the feedback form. Used in the header.

- `VITE_DISCORD_URL`: The URL of the Discord server. Used in the footer and 'Join Comunity' button.

- `VITE_X_URL`: The URL of the X website. Used in the footer.

- `VITE_LOGO_URL`: The URL of the logo. If it is not defined, the logo will point to the root of the web app and will not display the pointer cursor.

## Contribution

If you want to contribute to this project and make it better, your help is very welcome.
You can find more information about how to contribute in the [`CONTRIBUTING.md`](../../CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
