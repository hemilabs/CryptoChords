import { CubeRepository } from '../../../domain/repositories/CubeRepository';
import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository';
import { NetworkRepository } from '../../../domain/repositories/NetworkRepository';
import { OptionsRepository } from '../../../domain/repositories/OptionsRepository';
import { TransactionRepository } from '../../../domain/repositories/TransactionRepository';
import { InMemoryCubeRepository } from '../../../infrastructure/repositories/InMemoryCubeRepository';
import { InMemoryKeyboardRepository } from '../../../infrastructure/repositories/InMemoryKeyboardRepository';
import { LimitedInMemoryTransactionRepository } from '../../../infrastructure/repositories/LimitedInMemoryTransactionRepository';
import { LocalStorageOptionsRepository } from '../../../infrastructure/repositories/LocalStorageOptionsRepository';
import { StaticNetworksRepository } from '../../../infrastructure/repositories/StaticNetworksRepository';

export interface Repositories {
  cubeRepository: CubeRepository;
  transactionRepository: TransactionRepository;
  keyboardRepository: KeyboardRepository;
  optionsRepository: OptionsRepository;
  networkRepository: NetworkRepository;
}

export const repositories: Repositories = {
  cubeRepository: new InMemoryCubeRepository(),
  keyboardRepository: new InMemoryKeyboardRepository(),
  networkRepository: new StaticNetworksRepository(),
  optionsRepository: new LocalStorageOptionsRepository(),
  transactionRepository: new LimitedInMemoryTransactionRepository(),
};
