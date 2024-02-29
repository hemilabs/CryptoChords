import { Event } from './Event'
import { EventSubscription } from './EventSubscription'

export class EventBusInstance {
  private listeners = new Map<symbol, EventSubscription<Event>[]>()

  public async publish(event: Event) {
    const listeners = this.listeners.get(event.key)
    if (!listeners) {
      return
    }
    listeners.forEach(listener => listener(event))
  }

  public subscribe(eventKey: symbol, listener: EventSubscription<Event>): void {
    let listeners = this.listeners.get(eventKey)
    if (!listeners) {
      listeners = []
      this.listeners.set(eventKey, listeners)
    }
    listeners.push(listener)
  }

  public unsubscribe(eventKey: symbol, listener: EventSubscription<Event>): void {
    const listeners = this.listeners.get(eventKey)
    if (listeners) {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }
}
