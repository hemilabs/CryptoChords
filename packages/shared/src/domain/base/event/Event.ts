export class Event {
  timestamp: number

  protected constructor(protected eventKey: symbol) {
    this.timestamp = Date.now()
  }

  get key(): symbol {
    return this.eventKey
  }
}
