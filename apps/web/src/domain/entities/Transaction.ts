import { Address, Timestamp, TxType } from '@cryptochords/shared'

export interface TransactionProps {
  txType: TxType
  address: Address
  timestamp: Timestamp
}

export class Transaction {
  private props: TransactionProps

  private constructor(props: TransactionProps) {
    this.props = props
  }

  static create(props: TransactionProps) {
    return new Transaction(props)
  }

  get txType() {
    return this.props.txType
  }

  get address() {
    return this.props.address
  }

  get timestamp() {
    return this.props.timestamp
  }
}