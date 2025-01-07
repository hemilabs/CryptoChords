import { Event, Observable, TxTypesEnum } from '@cryptochords/shared';
import { ListTransactionsService } from '../../../../application/services/ListTransactions/ListTransactionsService';
import { Presenter } from '../../base/Presenter';
import { TransactionsPresenterState } from './TransactionsPresenterState';

const initalState: TransactionsPresenterState = {
  transactions: [],
};

const titleMap: Map<TxTypesEnum, string> = new Map([
  [TxTypesEnum.Block, 'New Block'],
  [TxTypesEnum.Eth, 'ETH'],
  [TxTypesEnum.Pop, 'PoP'],
  [TxTypesEnum.Btc, 'BTC'],
]);

const rgbMap: Map<TxTypesEnum, string> = new Map([
  [TxTypesEnum.Block, '#10FF2A'],
  [TxTypesEnum.Eth, '#00D3FF'],
  [TxTypesEnum.Pop, '#DC53FF'],
  [TxTypesEnum.Btc, '#FFB200'],
]);

const messageMap: Map<TxTypesEnum, string> = new Map([
  [TxTypesEnum.Block, 'created by'],
  [TxTypesEnum.Eth, 'transaction by'],
  [TxTypesEnum.Pop, 'transaction by'],
  [TxTypesEnum.Btc, 'transaction by'],
]);

export class TransactionsPresenter extends Presenter<TransactionsPresenterState> {
  private listTransactions: ListTransactionsService;

  constructor(
    listTransactions: ListTransactionsService,
    transactionsChangeObserver?: Observable<Event>,
  ) {
    super(initalState);
    this.listTransactions = listTransactions;
    if (transactionsChangeObserver) {
      transactionsChangeObserver.listen(this.refresh.bind(this));
    }
  }

  async refresh() {
    const response = await this.listTransactions.execute();
    this.changeState({
      transactions: response.transactions.map(transaction => ({
        at: this.formatDate(transaction.timestamp),
        color: rgbMap.get(transaction.txType as TxTypesEnum) ?? '#fff',
        id: transaction.address,
        message: messageMap.get(transaction.txType as TxTypesEnum) ?? ' ',
        type: titleMap.get(transaction.txType as TxTypesEnum) ?? 'Unknown',
        url: transaction.url,
      })),
    });
  }

  private formatDate(date: number) {
    const formattedDate = new Date(date).toLocaleString('en-US', {
      day: 'numeric',
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
      month: 'short',
      second: 'numeric',
      year: 'numeric',
    });

    return formattedDate.replace(/,/g, '');
  }
}
