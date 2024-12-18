import { TransactionRepository } from '../../../domain/repositories/TransactionRepository'
import { ObservableService } from '../../ObservableService'
import { ListTransactionsResponseDto } from './ListTransactionsDtos'

export class ListTransactionsService extends ObservableService<void, ListTransactionsResponseDto>{
  private readonly transactionRepository: TransactionRepository
  
  constructor(
    transactionRepository: TransactionRepository,
  ) {
    super()
    this.transactionRepository = transactionRepository
  }

  protected async process(): Promise<ListTransactionsResponseDto> {
    const transactions = await this.transactionRepository.list()

    return {
      transactions: transactions.map(transaction => ({
        txType: transaction.txType.value as string,
        address: transaction.address.value,
        timestamp: transaction.timestamp.value,
        url: transaction.url 
      }))
    }
  }
}