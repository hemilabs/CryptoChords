import { HemiMainnet, HemiTestnet, NetworkEnum } from '@cryptochords/shared';
import { NetworkRepository } from '../../domain/repositories/NetworkRepository';
import { Network } from '../../domain/entities/Network';

export class StaticNetworksRepository implements NetworkRepository {
  private readonly testnet = Network.create({
    explorerUrl: HemiTestnet.blockExplorers.default.url,
    name: NetworkEnum.TESTNET,
    wsUrl: StaticNetworksRepository.buildWebserviceUrl(NetworkEnum.TESTNET),
  });

  private readonly mainnet = Network.create({
    explorerUrl: HemiMainnet.blockExplorers.default.url,
    name: NetworkEnum.MAINNET,
    wsUrl: StaticNetworksRepository.buildWebserviceUrl(NetworkEnum.MAINNET),
  });

  private networks = [this.mainnet, this.testnet];

  private selectedNetwork: Network = this.testnet;

  async list() {
    return this.networks.slice();
  }

  async find(name: NetworkEnum) {
    if (!name) return undefined;

    return this.networks.find(network => network.name === name);
  }

  private static replaceHostWithCurrentLocation(url: string) {
    // replaces ${host} with the host address ignoring spaces and tabs within the brackets
    const regex = /\$\{[ \t]*host[ \t]*\}/i;
    return url.replace(regex, document.location.host);
  }

  private static getWebserviceUrlFromEnvironment(network: NetworkEnum) {
    return network === NetworkEnum.MAINNET
      ? import.meta.env.VITE_MAINNET_API_WEBSERVICE_URL
      : import.meta.env.VITE_TESTNET_API_WEBSERVICE_URL;
  }

  private static buildWebserviceUrl(network: NetworkEnum) {
    const url = this.getWebserviceUrlFromEnvironment(network);
    return this.replaceHostWithCurrentLocation(url!);
  }

  async select(name: NetworkEnum) {
    const network = await this.find(name);
    if (!network) throw new Error('Network not found');

    this.selectedNetwork = network;
  }

  async getSelected() {
    return this.selectedNetwork;
  }
}
