import { Entity } from '../base/Entity'
import { TxTypesEnum } from '../enums/TxTypesEnum'
import { Address } from '../valueObjects/Address'
import { TxType } from '../valueObjects/Txtype'
import { Uuid } from '../valueObjects/Uuid'

interface L2BlockProps {
  txType: TxType
  address: Address
}

interface L2BlockJSON {
  txType: string
  address: string
}

export class L2Block extends Entity<L2BlockProps> {
  private constructor(props: L2BlockProps, id: Uuid) {
    super(props, id)
  }

  static create(props: L2BlockProps, id?: Uuid): L2Block {
    const blockId = id ?? Uuid.create()
    return new L2Block(props, blockId)
  }

  static fromJSON(json: L2BlockJSON): L2Block {
    return L2Block.create({
      txType: TxType.create(json.txType as TxTypesEnum),
      address: Address.create(json.address)
    })
  }

  get txType(): string {
    return this.props.txType.value
  }

  get address(): string {
    return this.props.address.value
  }

  toJSON(): L2BlockJSON {
    return {
      txType: this.txType,
      address: this.address,
    }
  }
}
