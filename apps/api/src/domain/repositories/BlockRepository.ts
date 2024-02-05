import { EventEmitter } from 'events';

export interface BlockRepository extends EventEmitter {
  execute(websocketUrl: string): void
  stop(): void
}
