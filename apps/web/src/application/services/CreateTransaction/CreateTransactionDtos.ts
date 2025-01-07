export interface CreateTransactionRequest {
  txType: string;
  address: string;
  network: string;
  timestamp: number;
}
