import { CreateCubeService } from '../../../application/services/CreateCube/CreateCubeService'
import { CreateKeyboardService } from '../../../application/services/CreateKeyboard/CreateKeyboardService'
import { CreateTransactionService } from '../../../application/services/CreateTransaction/CreateTransactionService'
import { GetCubesService } from '../../../application/services/GetCubes/GetCubesService'
import { GetKeyboardService } from '../../../application/services/GetKeyboard/GetKeyboardService'
import { ListTransactionsService } from '../../../application/services/ListTransactions/ListTransactionsService'
import { MoveCubesUpService } from '../../../application/services/MoveCubesUp/MoveCubesUpService'
import { PressKeyService } from '../../../application/services/PressKey/PressKeyService'
import { ReleaseKeyService } from '../../../application/services/ReleaseKey/ReleaseKeyService'
import { repositories } from './repositories'

export interface Services {
  createTransaction: CreateTransactionService
  getCubes: GetCubesService
  createCube: CreateCubeService
  moveCubesUp: MoveCubesUpService
  createKeyboard: CreateKeyboardService
  pressKey: PressKeyService
  releaseKey: ReleaseKeyService
  listTransactions: ListTransactionsService
  getKeyboard: GetKeyboardService
}

const getCubes = new GetCubesService(repositories.cubeRepository)
const createCube = new CreateCubeService(repositories.cubeRepository)
const moveCubesUp = new MoveCubesUpService(repositories.cubeRepository)
const createKeyboard = new CreateKeyboardService(repositories.keyboardRepository)
const pressKey = new PressKeyService(repositories.keyboardRepository)
const releaseKey = new ReleaseKeyService(repositories.keyboardRepository)
const createTransaction = new CreateTransactionService(
  repositories.keyboardRepository,
  repositories.transactionRepository,
  createCube,
  pressKey,
  releaseKey
)
const listTransactions = new ListTransactionsService(repositories.transactionRepository)
const getKeyboard = new GetKeyboardService(repositories.keyboardRepository)

export const services: Services = {
  createTransaction,
  getCubes,
  createCube,
  moveCubesUp,
  createKeyboard,
  pressKey,
  releaseKey,
  listTransactions,
  getKeyboard
}
