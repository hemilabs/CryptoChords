import { Address, Timestamp, TxType, TxTypesEnum } from '@cryptochords/shared'
import { Transaction } from '../../../domain/entities/Transaction'
import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository'
import { TransactionRepository } from '../../../domain/repositories/TransactionRepository'
import { Key } from '../../../domain/valueObjects/Key'
import { ObservableService } from '../../ObservableService'
import { CreateCubeService } from '../CreateCube/CreateCubeService'
import { PressKeyService } from '../PressKey/PressKeyService'
import { ReleaseKeyService } from '../ReleaseKey/ReleaseKeyService'
import { CreateTransactionRequest } from './CreateTransactionDtos'

export class CreateTransactionService extends ObservableService<CreateTransactionRequest, void> {
  private readonly keyboardRepository: KeyboardRepository
  private readonly transactionRepository: TransactionRepository
  private readonly createCubeService: CreateCubeService
  private readonly pressKeyService: PressKeyService
  private readonly releaseKeyService: ReleaseKeyService

  constructor(
    keyboardRepository: KeyboardRepository,
    transactionRepository: TransactionRepository,
    createCubeService: CreateCubeService,
    pressKeyService: PressKeyService,
    releaseKeyService: ReleaseKeyService
  ) {
    super()
    this.keyboardRepository = keyboardRepository
    this.transactionRepository = transactionRepository
    this.createCubeService = createCubeService
    this.pressKeyService = pressKeyService
    this.releaseKeyService = releaseKeyService
  }

  protected async process(request: CreateTransactionRequest): Promise<void> {
    const transaction = await this.createTransaction(request)
    const key = await this.pressKey(transaction)
    if (!key)
      return
    await this.createCube(key)
    setTimeout(() => {
      this.releaseKey(key)
    }, 2000)
  }

  async createTransaction(request: CreateTransactionRequest): Promise<Transaction> {
    const transaction = Transaction.create({
      txType: TxType.create(request.txType as TxTypesEnum),
      address: Address.create(request.address),
      timestamp: Timestamp.create(request.timestamp)
    })
    await this.transactionRepository.create(transaction)

    return transaction
  }

  async createCube(key: Key): Promise<void> {
    this.createCubeService.execute({
      x: key.x.value,
      color: key.color
    })
  }

  async pressKey(transaction: Transaction): Promise<Key | undefined> {
    const keyboard = this.keyboardRepository.getKeyboard()
    if (!keyboard)
      return

    const randomKey = keyboard.getRandomWhiteKeyByTxType(transaction.txType.value)   

    this.pressKeyService.execute({
      pitchKey: randomKey.pitch.pitchClass.value,
      octave: randomKey.pitch.octave
    })
    
    return randomKey
  }

  async releaseKey(key: Key): Promise<void> {
    this.releaseKeyService.execute({
      pitchKey: key.pitch.pitchClass.value,
      octave: key.pitch.octave
    })
  }
}