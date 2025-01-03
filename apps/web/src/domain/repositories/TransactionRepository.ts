import { Transaction } from '../entities/Transaction';

export interface TransactionRepository {
  create(block: Transaction): Promise<void>;
  list(): Promise<Transaction[]>;
  clear(): Promise<void>;
}
