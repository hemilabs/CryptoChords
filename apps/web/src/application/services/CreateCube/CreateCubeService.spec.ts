import { describe, expect, it, vi } from 'vitest';
import { CubeRepository } from '../../../domain/repositories/CubeRepository';
import { CreateCubeService } from './CreateCubeService';

const cubeRepositoryMock: CubeRepository = {
  clear: vi.fn(),
  create: vi.fn().mockResolvedValue({
    color: { value: 'blue' },
    mirrored: false,
    uuid: { value: 'some-id' },
    x: { value: 0.5 },
    y: { value: 0 },
  }),
  delete: vi.fn(),
  list: vi.fn(),
  update: vi.fn(),
};

const create: CreateCubeService = new CreateCubeService(cubeRepositoryMock);

describe('src/application/CreateCube/CreateCubeService', () => {
  describe('execute', () => {
    it('should return', async () => {
      const response = await create.execute({ color: 'blue', x: 0.5 });
      expect(response).toEqual({
        color: 'blue',
        id: 'some-id',
        mirrored: false,
        x: 0.5,
        y: 0,
      });
    });
  });
});
