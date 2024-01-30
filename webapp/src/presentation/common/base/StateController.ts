type Subscription<State> = (state: State) => void

export abstract class StateController<State> {
  private internalState: State
  private listeners: Subscription<State>[] = []

  constructor(initalState: State) {
    this.internalState = initalState
  }

  public get state(): State {
    return this.internalState
  }

  protected changeState(state: Partial<State>): void {
    this.setState({
      ...this.internalState,
      ...state
    })
  }

  protected setState(state: State): void {
    this.internalState = state
    this.notifyStateChangeToListeners()
  }

  protected notifyStateChangeToListeners() {
    if (this.listeners.length > 0) {
      this.listeners.forEach(this.notifyStateChangeToListener.bind(this))
    }
  }

  protected notifyStateChangeToListener(listener: Subscription<State>) {
    listener(this.state)
  }

  public subscribe(listener: Subscription<State>, sendCurrentStatus = false): void {
    this.listeners.push(listener)
    if (sendCurrentStatus) {
      this.notifyStateChangeToListener(listener)
    }
  }

  public unsubscribe(listener: Subscription<State>): void {
    const index = this.listeners.indexOf(listener)
    if (index < 0) {
      return
    }

    this.listeners.splice(index, 1)
  }
}
