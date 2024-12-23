import { NetworkEnum } from '@cryptochords/shared'
import { Network } from '../entities/Network'

export interface NetworkRepository {
  list: () => Promise<Network[]>
  find: (name: NetworkEnum) => Promise<Network | undefined>
  select: (name: NetworkEnum) => Promise<void>
  getSelected: () => Promise<Network>
}