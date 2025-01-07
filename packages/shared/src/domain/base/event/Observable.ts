import { Event } from './Event';
import { EventSubscription } from './EventSubscription';

export interface Observable<E extends Event> {
  listen(listener: EventSubscription<E>): void;
}
