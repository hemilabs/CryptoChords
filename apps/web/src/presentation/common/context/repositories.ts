import { CubeRepository } from '../../../domain/repositories/CubeRepository'
import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository'
import { OptionsRepository } from '../../../domain/repositories/OptionsRepository'
import { TransactionRepository } from '../../../domain/repositories/TransactionRepository'
import { InMemoryCubeRepository } from '../../../infrastructure/repositories/InMemoryCubeRepository'
import { InMemoryKeyboardRepository } from '../../../infrastructure/repositories/InMemoryKeyboardRepository'
import { LimitedInMemoryTransactionRepository } from '../../../infrastructure/repositories/LimitedInMemoryTransactionRepository'
import { LocalStorageOptionsRepository } from '../../../infrastructure/repositories/LocalStorageOptionsRepository'

export interface Repositories {
  cubeRepository: CubeRepository
  transactionRepository: TransactionRepository,
  keyboardRepository: KeyboardRepository,
  optionsRepository: OptionsRepository
}

export const repositories: Repositories = {
  cubeRepository: new InMemoryCubeRepository(),
  transactionRepository: new LimitedInMemoryTransactionRepository(),
  keyboardRepository: new InMemoryKeyboardRepository(),
  optionsRepository: new LocalStorageOptionsRepository()
}
