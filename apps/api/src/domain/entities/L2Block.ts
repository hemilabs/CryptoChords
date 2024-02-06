import { Entity } from '../base/Entity'
import { Address } from '../valueObjects/Address'
import { TxType } from '../valueObjects/Txtype'

interface L2BlockProps {
  txType: TxType
  address: Address
}

export class L2Block extends Entity<L2BlockProps> {
  private constructor(props: L2BlockProps) {
    super(props)
  }
  
  static create(props: L2BlockProps): L2Block {
    return new L2Block(props)
  }

  get txType(): string {
    return this.props.txType.value
  }

  get address(): string {
    return this.props.address.value
  }

  toJSON(): object {
    return {
      txType: this.txType,
      address: this.address,
    };
  }
}
