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
import { InstrumentEnum } from '../../../domain/enum/InstrumentEnum'

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
    const [ key, instrument ] = await this.pressKey(transaction)
    if (!key)
      return
    await this.createCube(key)

    setTimeout(() => {
      this.releaseKey(key, instrument)
    }, 100 + Math.random() * 3_000)
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

  async pressKey(transaction: Transaction): Promise<[Key  | undefined, (InstrumentEnum | undefined) ] > {
    const keyboard = this.keyboardRepository.getKeyboard()
    if (!keyboard)
      return [undefined, undefined]

    const randomKey = keyboard.getRandomWhiteKeyByTxType(transaction.txType.value)   

    const { instrument } = await this.pressKeyService.execute({
      pitchClass: randomKey.pitch.pitchClass.value,
      octave: randomKey.pitch.octave
    })
    
    return [randomKey, instrument as InstrumentEnum]
  }

  async releaseKey(key: Key, instrument?: InstrumentEnum): Promise<void> {
    this.releaseKeyService.execute({
      pitchClass: key.pitch.pitchClass.value,
      octave: key.pitch.octave,
      instrument
    })
  }
}