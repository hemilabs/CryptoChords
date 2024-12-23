import { NetworkEnum } from '@cryptochords/shared'
import { Network } from '../../../domain/entities/Network'
import { CubeRepository } from '../../../domain/repositories/CubeRepository'
import { NetworkRepository } from '../../../domain/repositories/NetworkRepository'
import { TransactionRepository } from '../../../domain/repositories/TransactionRepository'
import { ObservableService } from '../../ObservableService'
import { SwitchNetworkRequestDto } from './SwitchNetworkRequestDto'
import { SwitchNetworkResponseDto } from './SwitchNetworkResponseDto'

export class SwitchNetworkService extends ObservableService<SwitchNetworkRequestDto, SwitchNetworkResponseDto> {
  private readonly transactionRepository: TransactionRepository
  private readonly networkRepository: NetworkRepository
  private readonly cubeRepository: CubeRepository

  constructor(
    transactionRepository: TransactionRepository,
    networkRepository: NetworkRepository,
    cubeRepository: CubeRepository
  ) {
    super()
    this.transactionRepository = transactionRepository
    this.networkRepository = networkRepository
    this.cubeRepository = cubeRepository
  }

  protected async process(request: SwitchNetworkRequestDto): Promise<SwitchNetworkResponseDto> {
    const network = await this.validateNetwork(request.networkName)
    await Promise.all([
      this.transactionRepository.clear(),
      this.cubeRepository.clear(),
      this.networkRepository.select(network.name)
    ])

    return {
      networkName: network.name,
      networkWsUrl: network.wsUrl
    }
  }

  private async validateNetwork(networkName: string): Promise<Network> {
    if (!networkName) {
      throw new Error('Network not found')
    }

    const network = await this.networkRepository.find(networkName as NetworkEnum)

    if (!network) {
      throw new Error('Network not found')
    }

    return network
  }
}