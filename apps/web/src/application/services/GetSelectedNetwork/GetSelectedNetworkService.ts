import { NetworkRepository } from '../../../domain/repositories/NetworkRepository'
import { ObservableService } from '../../ObservableService'
import { GetSelectedNetworkResponseDto } from './GetSelectedNetworkResponseDto'

export class GetSelectedNetworkService extends ObservableService<void, GetSelectedNetworkResponseDto> {
  private readonly netwtorkRepository: NetworkRepository

  constructor(
    networkRepository: NetworkRepository,
  ) {
    super()
    this.netwtorkRepository = networkRepository
  }

  protected async process(): Promise<GetSelectedNetworkResponseDto> {
    const network = await this.netwtorkRepository.getSelected()
    return {
      networkName: network.name,
      networkWsUrl: network.wsUrl,
    }
  }
}