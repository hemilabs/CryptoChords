import { CreateCubeService } from '../../../application/services/CreateCube/CreateCubeService'
import { CreateKeyboardService } from '../../../application/services/CreateKeyboard/CreateKeyboardService'
import { CreateTransactionService } from '../../../application/services/CreateTransaction/CreateTransactionService'
import { GetCubesService } from '../../../application/services/GetCubes/GetCubesService'
import { GetKeyboardService } from '../../../application/services/GetKeyboard/GetKeyboardService'
import { ListTransactionsService } from '../../../application/services/ListTransactions/ListTransactionsService'
import { PressKeyService } from '../../../application/services/PressKey/PressKeyService'
import { ReleaseKeyService } from '../../../application/services/ReleaseKey/ReleaseKeyService'
import { repositories } from './repositories'
import { domainServices } from './domainServices'
import { PlaySoundService } from '../../../application/services/PlaySound/PlaySoundService'
import { StopSoundService } from '../../../application/services/StopSound/StopSoundService'
import { GetOptionsService } from '../../../application/services/GetOptions/GetOptionsService'
import { SetMutedService } from '../../../application/services/SetMuted/SetMutedService'
import { SetInstrumentService } from '../../../application/services/SetInstrument/SetInstrumentService'
import { LoadInstrumentService } from '../../../application/services/LoadInstrument/LoadInstrumentService'
import { RecalculateCubePositionsService } from '../../../application/services/RecalculateCubePositions/RecalculateCubePositionsService'

export interface Services {
  createTransaction: CreateTransactionService
  getCubes: GetCubesService
  createCube: CreateCubeService
  recalculateCubePosition: RecalculateCubePositionsService
  createKeyboard: CreateKeyboardService
  pressKey: PressKeyService
  releaseKey: ReleaseKeyService
  listTransactions: ListTransactionsService
  getKeyboard: GetKeyboardService
  getOptions: GetOptionsService
  setMuted: SetMutedService
  setInstrument: SetInstrumentService
  loadInstrument: LoadInstrumentService
}

const getCubes = new GetCubesService(repositories.cubeRepository)
const createCube = new CreateCubeService(repositories.cubeRepository)
const recalculateCubePosition = new RecalculateCubePositionsService(repositories.cubeRepository)
const createKeyboard = new CreateKeyboardService(repositories.keyboardRepository)
const playSound = new PlaySoundService(domainServices.soundService, repositories.optionsRepository)
const stopSound = new StopSoundService(domainServices.soundService)
const pressKey = new PressKeyService(repositories.keyboardRepository, playSound)
const releaseKey = new ReleaseKeyService(repositories.keyboardRepository, stopSound)
const createTransaction = new CreateTransactionService(
  repositories.keyboardRepository,
  repositories.transactionRepository,
  createCube,
  pressKey,
  releaseKey
)
const listTransactions = new ListTransactionsService(repositories.transactionRepository)
const getKeyboard = new GetKeyboardService(repositories.keyboardRepository)
const getOptions = new GetOptionsService(repositories.optionsRepository)
const setMuted = new SetMutedService(repositories.optionsRepository)
const setInstrument = new SetInstrumentService(repositories.optionsRepository)
const loadInstrument = new LoadInstrumentService(domainServices.soundService)

export const services: Services = {
  createTransaction,
  getCubes,
  createCube,
  recalculateCubePosition,
  createKeyboard,
  pressKey,
  releaseKey,
  listTransactions,
  getKeyboard,
  getOptions,
  setMuted,
  setInstrument,
  loadInstrument
}
