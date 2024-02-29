import { Event } from './Event'
import { EventSubscription } from './EventSubscription'
import { Observable } from './Observable'

export class ObservableSet<E extends Event> implements Observable<E>{
  private listeners: Observable<E>[] = []
  
  constructor(...listeners:Observable<E>[]) {
    this.listeners = listeners
  }

  listen(listener: EventSubscription<E>): void {
    this.listeners.forEach(l => l.listen(listener))
  }
}