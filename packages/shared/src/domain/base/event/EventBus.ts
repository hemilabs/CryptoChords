import { Event } from './Event';
import { EventBusInstance } from './EventBusInstance';
import { EventSubscription } from './EventSubscription';

export default class EventBus {
  static instance = new EventBusInstance();

  static publish(event: Event) {
    this.instance.publish(event);
  }

  static subscribe<E extends Event = Event>(
    eventKey: symbol,
    listener: EventSubscription<E>,
  ): void {
    this.instance.subscribe(eventKey, listener as EventSubscription<Event>);
  }

  static unsubscribe(
    eventKey: symbol,
    listener: EventSubscription<Event>,
  ): void {
    this.instance.unsubscribe(eventKey, listener);
  }
}
