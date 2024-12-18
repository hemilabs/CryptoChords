import { Address, Timestamp, TxType } from '@cryptochords/shared'
import { Network } from './Network'

export interface TransactionProps {
  txType: TxType
  address: Address
  network: Network
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

  get network() {
    return this.props.network
  }

  get timestamp() {
    return this.props.timestamp
  }

  get url() {
    if(this.props.txType.isBlock) {
      return `${this.props.network.blockUrl}/${this.props.address.value}`
    }

    return `${this.props.network.transactionUrl}/${this.props.address.value}`
  }
}