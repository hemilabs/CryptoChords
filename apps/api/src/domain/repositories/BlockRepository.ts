import { EventEmitter } from 'events';

export interface BlockRepository extends EventEmitter {
  execute(url: string): void;
  stop(): void;
}
