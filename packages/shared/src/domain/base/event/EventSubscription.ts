import { Event } from './Event';

export type EventSubscription<T extends Event> = (event: T) => Promise<void>;
