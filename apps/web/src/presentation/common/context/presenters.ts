import { ObservableSet } from '@cryptochords/shared'
import { AppPresenter } from '../presenter/app/AppPresenter'
import { CubesPresenter } from '../presenter/cubes/CubesPresenter'
import { KeyboardPresenter } from '../presenter/keyboard/KeyboardPresenter'
import { TransactionsPresenter } from '../presenter/transactions/TransactionsPresenter'
import { services } from './services'

export interface Presenters {
  cubesPresenter: CubesPresenter
  appPresenter: AppPresenter
  keyboardPresenter: KeyboardPresenter
  transactionsPresenter: TransactionsPresenter
}

const cubesPresenter = new CubesPresenter(
  services.getCubes,
  services.moveCubesUp,
)
const appPresenter = new AppPresenter(
  services.createTransaction
)

const keyboardPresenter = new KeyboardPresenter(
  services.createKeyboard,
  services.getKeyboard,
  new ObservableSet(
    services.pressKey,
    services.releaseKey
  )
)
const transactionsPresenter = new TransactionsPresenter(
  services.listTransactions,
  services.createTransaction
)

export const presenters: Presenters = {
  cubesPresenter,
  appPresenter,
  keyboardPresenter,
  transactionsPresenter
}
