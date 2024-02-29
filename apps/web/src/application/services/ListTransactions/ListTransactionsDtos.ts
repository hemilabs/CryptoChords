interface TransactionDto {
  txType: string
  address: string
  timestamp: number
}

export interface ListTransactionsResponseDto {
  transactions: TransactionDto[]
}