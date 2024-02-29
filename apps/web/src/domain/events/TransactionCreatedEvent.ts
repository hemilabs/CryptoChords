import { Event } from '@cryptochords/shared'
import { Transaction } from '../entities/Transaction'

export class TransactionCreatedEvent extends Event {
  static eventKey:symbol = Symbol('TransactionCreatedEvent')

  private readonly transaction: Transaction

  constructor(transaction: Transaction) {
    super(TransactionCreatedEvent.eventKey)
    this.transaction = transaction
  }

  static create(transaction: Transaction): TransactionCreatedEvent {
    return new TransactionCreatedEvent(transaction)
  }

  getTransaction(): Transaction {
    return this.transaction
  }
}