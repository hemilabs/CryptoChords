import qs from 'qs';
import { CreateTransactionService } from '../../../../application/services/CreateTransaction/CreateTransactionService';
import { GetSelectedNetworkService } from '../../../../application/services/GetSelectedNetwork/GetSelectedNetworkService';
import { ListNetworksService } from '../../../../application/services/ListNetworks/ListNetworksService';
import { SwitchNetworkService } from '../../../../application/services/SwitchNetwork/SwitchNetworkService';
import { Presenter } from '../../base/Presenter';
import { AppPresenterState } from './AppPresenterState';

const initialState: AppPresenterState = {
  enableMainnet: import.meta.env.VITE_ENABLE_MAINNET === 'true',
  navMenuVisible: false,
  networkNames: [],
  selectedNetworkName: null,
  selectedNetworkWsUrl: null,
};

export class AppPresenter extends Presenter<AppPresenterState> {
  private createTransactionService: CreateTransactionService;
  private switchNetworkService: SwitchNetworkService;
  private getSelectedNetworkService: GetSelectedNetworkService;
  private listNetworks: ListNetworksService;

  constructor(
    createTransactionService: CreateTransactionService,
    switchNetworkService: SwitchNetworkService,
    getSelectedNetworkService: GetSelectedNetworkService,
    listNetworks: ListNetworksService,
  ) {
    super({
      ...initialState,
    });
    this.createTransactionService = createTransactionService;
    this.switchNetworkService = switchNetworkService;
    this.getSelectedNetworkService = getSelectedNetworkService;
    this.listNetworks = listNetworks;
    this.init();
  }

  private async init() {
    const networkType = this.parseUrlForNetworkType();
    await this.loadNetworkState();

    if (this.isNetworkValid(networkType)) {
      await this.selectNetwork(networkType!);
    }
  }

  private parseUrlForNetworkType(): string | null {
    const urlParams = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    return urlParams.networkType as string | null;
  }

  private isNetworkValid(networkType: string | null): boolean {
    return (
      networkType !== null &&
      this.state.networkNames.includes(networkType) &&
      initialState.enableMainnet
    );
  }

  private async loadNetworkState() {
    const { networks } = await this.listNetworks.execute();

    if (!networks) return;

    const networkNames = networks.map(network => network.name);
    const selectedNetwork = await this.getSelectedNetworkService.execute();

    this.changeState({
      networkNames,
      selectedNetworkName: selectedNetwork.networkName,
      selectedNetworkWsUrl: selectedNetwork.networkWsUrl,
    });
  }

  closeButtonClicked() {
    this.changeState({
      navMenuVisible: false,
    });
  }

  navButtonClicked() {
    this.changeState({
      navMenuVisible: true,
    });
  }

  async selectNetwork(networkName: string) {
    const response = await this.switchNetworkService.execute({
      networkName,
    });

    this.changeState({
      selectedNetworkName: response.networkName,
      selectedNetworkWsUrl: response.networkWsUrl,
    });
  }

  async createTransaction(
    txType: string,
    address: string,
    network: string,
  ): Promise<void> {
    return this.createTransactionService.execute({
      address,
      network,
      timestamp: Date.now(),
      txType,
    });
  }
}
