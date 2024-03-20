# CryptoChords Web App
This is the web app for CryptoChords.
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

### Presenters
This sublayer contains the presenters of the application. It is responsible for the whole user interface logic.

### React
This sublayer contains the React implementation of the application. Its components are responsible for the style and the interface with the presenters, displaying its state and redirecting the user actions.

### Vite
Vite was used to build the web app. It is a build tool that aims to provide a faster and leaner development experience for modern web projects.

#### Environment Variables

The environment variables are defined in the `.env` file. The following variables are used:

- `VITE_API_WEBSERVICE_URL`: The URL of the web service API. If the variable contains the value `${host}` it will be replaced by the host of the web app. Make sure to escape the dollar sign `\${host}` otherwise it will expanded using [dotenv-expand](https://github.com/motdotla/dotenv-expand) as described on [Vite Docs](https://vitejs.dev/guide/env-and-mode#env-files).

- `VITE_USE_API_MOCK`: A boolean that indicates if the API should be mocked.

- `VITE_GITHUB_URL`: The URL of the GitHub repository. Used in the header and footer.

- `VITE_CONTRIBUTORS_URL`: The URL of the contributors file. Used in the header.

- `VITE_FEEDBACK_URL`: The URL of the feedback form. Used in the header.

- `VITE_DISCORD_URL`: The URL of the Discord server. Used in the footer and 'Join Comunity' button.

- `VITE_X_URL`: The URL of the X website. Used in the footer.

- `VITE_LOGO_URL`: The URL of the logo. If it is not defined, the logo will point to the root of the web app and will not display the pointer cursor.
