import { Presenter } from '../../base/Presenter'
import { AppPresenterState } from './AppPresenterState'

const initalState: AppPresenterState = {
  navMenuVisible: false,
}

export class AppPresenter extends Presenter<AppPresenterState> {
  constructor(
  ) {
    super(initalState)
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

}
