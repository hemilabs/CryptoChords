import { CreateTransactionService } from '../../../../application/services/CreateTransaction/CreateTransactionService'
import { Presenter } from '../../base/Presenter'
import { AppPresenterState } from './AppPresenterState'

const initalState: AppPresenterState = {
  navMenuVisible: false,
}

export class AppPresenter extends Presenter<AppPresenterState> {
  private createTransactionService: CreateTransactionService

  constructor(
    createTransactionService: CreateTransactionService
  ) {
    super(initalState)
    this.createTransactionService = createTransactionService
  }

  closeButtonClicked() {
    this.changeState({
      navMenuVisible: false,
    })
  }

  navButtonClicked() {
    this.changeState({
      navMenuVisible: true,
    })
  }

  async createTransaction(txType: string, address: string): Promise<void> {
    return this.createTransactionService.execute({
      txType,
      address,
      timestamp: Date.now()
    })
  }
}
