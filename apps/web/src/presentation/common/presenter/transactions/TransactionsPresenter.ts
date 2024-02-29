import { Event, Observable, TxTypesEnum } from '@cryptochords/shared'
import { ListTransactionsService } from '../../../../application/services/ListTransactions/ListTransactionsService'
import { TransactionColor } from '../../../../domain/valueObjects/TransactionColor'
import { Presenter } from '../../base/Presenter'
import { TransactionsPresenterState } from './TransactionsPresenterState'

const initalState: TransactionsPresenterState = {
  transactions: [],
}

const titleMap: Map<TxTypesEnum, string> = new Map([
  [TxTypesEnum.Block, 'New Block'],
  [TxTypesEnum.Eth, 'ETH'],
  [TxTypesEnum.Pop, 'PoP'],
  [TxTypesEnum.Btc, 'BTC']
])

const messageMap: Map<TxTypesEnum, string> = new Map([
  [TxTypesEnum.Block, 'created by'],
  [TxTypesEnum.Eth, 'transaction by'],
  [TxTypesEnum.Pop, 'transaction by'],
  [TxTypesEnum.Btc, 'transaction by']
])

export class TransactionsPresenter extends Presenter<TransactionsPresenterState> {

  private listTransactions: ListTransactionsService

  constructor(listTransactions: ListTransactionsService, transactionsChangeObserver?: Observable<Event>) {
    super(initalState)
    this.listTransactions = listTransactions
    if(transactionsChangeObserver) {
      transactionsChangeObserver.listen(this.refresh.bind(this))
    }
  }

  async refresh() { 
    const response = await this.listTransactions.execute()
    this.changeState({
      transactions: response.transactions.map(transaction => ({
        type: titleMap.get(transaction.txType as TxTypesEnum) ?? 'Unknown',
        color: TransactionColor.createByTxType(transaction.txType).value,
        message: messageMap.get(transaction.txType as TxTypesEnum) ?? ' ',
        id: transaction.address,
        at: this.formatDate(transaction.timestamp)
      }))
    })
  }

  private formatDate(date: number) {
    const formattedDate = new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    })

    return formattedDate.replace(/,/g, '')
  }
}
