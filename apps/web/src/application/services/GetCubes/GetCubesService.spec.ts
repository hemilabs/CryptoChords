import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import { CubeRepository } from '../../../domain/repositories/CubeRepository'
import { GetCubesService } from './GetCubesService'
import { GetCubesResponseDto } from './GetCubesDtos'

const cubeRepositoryMock: CubeRepository = {
  create: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
  list: vi.fn().mockResolvedValue([{
    uuid: { value: 'some-id' },
    x: { value: 0.5 },
    y: { value: 0 },
    color: { value: 'blue' },
    mirrored: false
  }, {
    uuid: { value: 'another-id' },
    x: { value: 0.1 },
    y: { value: 0 },
    color: { value: 'orange' },
    mirrored: false
  }]),
  clear: vi.fn()
}

const getCubes = new GetCubesService(cubeRepositoryMock)

describe('src/application/CreateCube/GetCubesService', () => {
  describe('execute', async () => {
    const response: GetCubesResponseDto = await getCubes.execute()

    it('should call list once', () => {
      expect(cubeRepositoryMock.list).toHaveBeenCalledOnce()
    })

    it('should return a GetCubesResponseDto', () => {
      expectTypeOf(response).toMatchTypeOf<GetCubesResponseDto>()
    })

    it('should return the correct number of items', () => {
      expect(response.cubes.length).toEqual(2)
    })

    it('should return the correct values', async () => {
      expect(response).toEqual({
        cubes: [{
          id: 'some-id',
          x: 0.5,
          y: 0,
          color: 'blue',
          mirrored: false
        }, {
          id: 'another-id',
          x: 0.1,
          y: 0,
          color: 'orange',
          mirrored: false
        }]
      })
    })
  })
})
