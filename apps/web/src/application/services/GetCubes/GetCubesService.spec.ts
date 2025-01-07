import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { CubeRepository } from '../../../domain/repositories/CubeRepository';
import { GetCubesService } from './GetCubesService';
import { GetCubesResponseDto } from './GetCubesDtos';

const cubeRepositoryMock: CubeRepository = {
  clear: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
  list: vi.fn().mockResolvedValue([
    {
      color: { value: 'blue' },
      mirrored: false,
      uuid: { value: 'some-id' },
      x: { value: 0.5 },
      y: { value: 0 },
    },
    {
      color: { value: 'orange' },
      mirrored: false,
      uuid: { value: 'another-id' },
      x: { value: 0.1 },
      y: { value: 0 },
    },
  ]),
  update: vi.fn(),
};

const getCubes = new GetCubesService(cubeRepositoryMock);

describe('src/application/CreateCube/GetCubesService', () => {
  describe('execute', async () => {
    const response: GetCubesResponseDto = await getCubes.execute();

    it('should call list once', () => {
      expect(cubeRepositoryMock.list).toHaveBeenCalledOnce();
    });

    it('should return a GetCubesResponseDto', () => {
      expectTypeOf(response).toMatchTypeOf<GetCubesResponseDto>();
      expect(response).toBeDefined();
    });

    it('should return the correct number of items', () => {
      expect(response.cubes.length).toEqual(2);
    });

    it('should return the correct values', async () => {
      expect(response).toEqual({
        cubes: [
          {
            color: 'blue',
            id: 'some-id',
            mirrored: false,
            x: 0.5,
            y: 0,
          },
          {
            color: 'orange',
            id: 'another-id',
            mirrored: false,
            x: 0.1,
            y: 0,
          },
        ],
      });
    });
  });
});
