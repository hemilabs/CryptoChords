# CryptoChords
CryptoChords is a tool for visualizing activities on the [Hemi network](https://hemi.xyz). It features a web application that enables users to explore the network and visualize transactions in a user-friendly manner.

This document provides instructions on how to set up, run, and contribute to the project.

## Visual Representation of the Network
CryptoChords provides a visual representation of the Hemi network using a piano keyboard as a metaphor. Every time a new transaction is added to the network, a cube appears on a piano key, representing the transaction. The transaction details are displayed on the screen, and if sound is enabled, the corresponding piano note is played simultaneously.

There are four types of transactions, each represented by a different color and associated with a different quadrant of the piano keyboard:

- **Green**: Hemi block creation
- **Blue**: Ethereum transaction
- **Orange**: Bitcoin transaction
- **Purple**: Pop Miner transaction

A random key within the corresponding quadrant is selected to represent each transaction.


## Folder Structure
The project is organized into the following folders:

- `apps`: Contains the API and the Web application.
- `packages`: Contains the components shared between the apps.
- `infrastucture`: Contains the necessary files to deploy the project.

## Architecture
This project is a monorepo composed of two applications: the API and the Web application and it is managed by [Turborepo](https://turbo.build/repo/docs).

Both the API and the Web application follow the Domain-Driven Design (DDD) principles. You can find more information about the architecture in the `readme.md` file of each project.

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Clone the repository:

```bash
git clone git@github.com:hemilabs/CryptoChords.git
```

2. Open the project folder:

```bash
cd CryptoChords
```

3. Install the dependencies:

```bash
npm install
```

4. Build the project:

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

## Deployment
We have two environments: `stage` and `production`.
The project is automatically deployed using GitHub Actions. 

### Stage
The `stage` environment is automatically deployed when a new tag is created. The tag must follow the pattern `v*.*.*`. For example, `v1.0.0`.

### Production
The `production` environment is automatically deployed when a Commit is pushed to the `main` branch.

## Contributing
If you want to contribute to this project and make it better, your help is very welcome.
You can find more information about how to contribute in the [`CONTRIBUTING.md`](./CONTRIBUTING.md) file.

## License
This project is licensed under the MIT License - see the [`LICENSE`](./LICENSE) file for details.
