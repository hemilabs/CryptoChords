interface TransactionDto {
  txType: string;
  address: string;
  timestamp: number;
  url: string;
}

export interface ListTransactionsResponseDto {
  transactions: TransactionDto[];
}
