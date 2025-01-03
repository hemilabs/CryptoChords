import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { ExpressServer } from './presentation/ExpressServer';

vi.mock('./presentation/ExpressServer');

describe('server', () => {
  beforeEach(() => {
    vi.spyOn(process, 'exit').mockImplementation(() => {
      return undefined as never;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeAll(() => {
    ExpressServer.prototype.start = vi.fn();
    ExpressServer.prototype.stop = vi.fn();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should start the server', async () => {
    await import('./server');
    expect(ExpressServer.prototype.start).toHaveBeenCalled();
  });

  it('should stop the server on SIGTERM', async () => {
    process.emit('SIGTERM');
    expect(ExpressServer.prototype.stop).toHaveBeenCalled();
  });

  it('should stop the server on SIGINT', async () => {
    process.emit('SIGINT');
    expect(ExpressServer.prototype.stop).toHaveBeenCalled();
  });
});
