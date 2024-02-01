import { ValueObject } from '../base/ValueObject'
import { TxTypesEnum } from '../enums/TxTypesEnum'

interface TxTypeProps {
  value: TxTypesEnum
}

export class TxType extends ValueObject<TxTypeProps> {
  private constructor(txType: TxTypesEnum) {
    super({ value: txType })
  }

  static create(txType: TxTypesEnum) {
    return new TxType(txType)
  }

  get value() {
    return this.props.value
  }
}
