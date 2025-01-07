import {
  Address,
  NetworkEnum,
  Timestamp,
  TxType,
  TxTypesEnum,
} from '@cryptochords/shared';
import { Transaction } from '../../../domain/entities/Transaction';
import { InstrumentEnum } from '../../../domain/enum/InstrumentEnum';
import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository';
import { NetworkRepository } from '../../../domain/repositories/NetworkRepository';
import { TransactionRepository } from '../../../domain/repositories/TransactionRepository';
import { Key } from '../../../domain/valueObjects/Key';
import { ObservableService } from '../../ObservableService';
import { CreateCubeService } from '../CreateCube/CreateCubeService';
import { PressKeyService } from '../PressKey/PressKeyService';
import { ReleaseKeyService } from '../ReleaseKey/ReleaseKeyService';
import { CreateTransactionRequest } from './CreateTransactionDtos';

export class CreateTransactionService extends ObservableService<
  CreateTransactionRequest,
  void
> {
  private readonly keyboardRepository: KeyboardRepository;
  private readonly transactionRepository: TransactionRepository;
  private readonly createCubeService: CreateCubeService;
  private readonly pressKeyService: PressKeyService;
  private readonly releaseKeyService: ReleaseKeyService;
  private readonly netwtorkRepository: NetworkRepository;

  // eslint-disable-next-line max-params
  constructor(
    keyboardRepository: KeyboardRepository,
    transactionRepository: TransactionRepository,
    createCubeService: CreateCubeService,
    pressKeyService: PressKeyService,
    releaseKeyService: ReleaseKeyService,
    networkRepository: NetworkRepository,
  ) {
    super();
    this.keyboardRepository = keyboardRepository;
    this.transactionRepository = transactionRepository;
    this.createCubeService = createCubeService;
    this.pressKeyService = pressKeyService;
    this.releaseKeyService = releaseKeyService;
    this.netwtorkRepository = networkRepository;
  }

  protected async process(request: CreateTransactionRequest): Promise<void> {
    const transaction = await this.createTransaction(request);
    const [key, instrument] = await this.pressKey(transaction);
    if (!key) return;
    await this.createCube(key);

    setTimeout(
      () => {
        this.releaseKey(key, instrument);
      },
      100 + Math.random() * 3_000,
    );
  }

  async createTransaction(
    request: CreateTransactionRequest,
  ): Promise<Transaction> {
    const network = await this.netwtorkRepository.find(
      request.network as NetworkEnum,
    );

    if (!network) throw new Error('Network not found');

    const transaction = Transaction.create({
      address: Address.create(request.address),
      network,
      timestamp: Timestamp.create(request.timestamp),
      txType: TxType.create(request.txType as TxTypesEnum),
    });
    await this.transactionRepository.create(transaction);

    return transaction;
  }

  async createCube(key: Key): Promise<void> {
    this.createCubeService.execute({
      color: key.color,
      x: key.x.value,
    });
  }

  async pressKey(
    transaction: Transaction,
  ): Promise<[Key | undefined, InstrumentEnum | undefined]> {
    const keyboard = this.keyboardRepository.getKeyboard();
    if (!keyboard) return [undefined, undefined];

    const randomKey = keyboard.getRandomWhiteKeyByTxType(
      transaction.txType.value,
    );

    const { instrument } = await this.pressKeyService.execute({
      octave: randomKey.pitch.octave,
      pitchClass: randomKey.pitch.pitchClass.value,
    });

    return [randomKey, instrument as InstrumentEnum];
  }

  async releaseKey(key: Key, instrument?: InstrumentEnum): Promise<void> {
    this.releaseKeyService.execute({
      instrument,
      octave: key.pitch.octave,
      pitchClass: key.pitch.pitchClass.value,
    });
  }
}
