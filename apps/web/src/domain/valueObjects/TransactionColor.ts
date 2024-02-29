import { TxTypesEnum, ValueObject } from '@cryptochords/shared'
import { TransactionColorEnum } from '../enum/TransactionColorEnum'

interface TransactionColorProps {
  value: TransactionColorEnum
}

export class TransactionColor extends ValueObject<TransactionColorProps> {
  private constructor(color: TransactionColorEnum) {
    super({ value: color })
  }

  static createByTxType(txType: string) {
    if (txType === TxTypesEnum.Btc)
      return this.create(TransactionColorEnum.Orange)

    if (txType === TxTypesEnum.Eth)
      return this.create(TransactionColorEnum.Blue)

    if (txType === TxTypesEnum.Pop)
      return this.create(TransactionColorEnum.Purple)

    return this.create(TransactionColorEnum.Green)
  }

  static create(color: TransactionColorEnum) {
    return new TransactionColor(color)
  }

  static random() {
    return this.create(TransactionColor.randomColorValue())
  }

  private static randomColorValue(): TransactionColorEnum {
    const enumValues = Object.values(TransactionColorEnum)
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue as TransactionColorEnum
  }

  get value() {
    return this.props.value
  }
}
