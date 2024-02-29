import { Transaction } from '../../domain/entities/Transaction'
import { TransactionRepository } from '../../domain/repositories/TransactionRepository'

export class LimitedInMemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[] = []

  constructor(private max = 9) {
    //
  }

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction)
    this.enforceMaxSize()
  }

  private enforceMaxSize() {
    if (this.transactions.length > this.max) {
      this.transactions.shift()
    }
  }

  async list(): Promise<Transaction[]> {
    return this.transactions
  }
}