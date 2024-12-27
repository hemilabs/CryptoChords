import { NetworkRepository } from '../../../domain/repositories/NetworkRepository'
import { ObservableService } from '../../ObservableService'
import { ListNetworksResponseDto } from './ListNetworksResponseDto'


export class ListNetworksService extends ObservableService<void, ListNetworksResponseDto> {
  private readonly networkRepository: NetworkRepository

  constructor(
    networkRepository: NetworkRepository,
  ) {
    super()
    this.networkRepository = networkRepository
  }

  protected async process(): Promise<ListNetworksResponseDto> {
    const [networks, selectedNetwork] = await Promise.all([
      this.networkRepository.list(),
      this.networkRepository.getSelected()
    ])

    return {
      networks: networks.map(network => ({
        name: network.name,
        wsUrl: network.wsUrl,
        selected: network.name === selectedNetwork.name,
      }))
    }
  }
}