import { Event, ObservableSet } from '@cryptochords/shared'
import { AppPresenter } from '../presenter/app/AppPresenter'
import { CubesPresenter } from '../presenter/cubes/CubesPresenter'
import { KeyboardPresenter } from '../presenter/keyboard/KeyboardPresenter'
import { TransactionsPresenter } from '../presenter/transactions/TransactionsPresenter'
import { services } from './services'
import { OptionsPresenter } from '../presenter/options/OptionsPresenter'

export interface Presenters {
  cubesPresenter: CubesPresenter
  appPresenter: AppPresenter
  keyboardPresenter: KeyboardPresenter
  transactionsPresenter: TransactionsPresenter
  optionsPresenter: OptionsPresenter
}

const cubesPresenter = new CubesPresenter(
  services.getCubes,
  services.recalculateCubePosition
)

const appPresenter = new AppPresenter(
  services.createTransaction,
  services.switchNetwork,
  services.getSelectedNetwork,
  services.listNetworks
)

const keyboardPresenter = new KeyboardPresenter(
  services.createKeyboard,
  services.getKeyboard,
  new ObservableSet<Event>(
    services.pressKey,
    services.releaseKey
  )
)

const transactionsPresenter = new TransactionsPresenter(
  services.listTransactions,
  new ObservableSet<Event>(
    services.createTransaction,
    services.switchNetwork
  )
)

const optionsPresenter = new OptionsPresenter(
  services.getOptions,
  services.setMuted,
  services.setInstrument,
  services.loadInstrument
)


export const presenters: Presenters = {
  cubesPresenter,
  appPresenter,
  keyboardPresenter,
  transactionsPresenter,
  optionsPresenter
}
