import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import { CubeRepository } from '../../domain/repositories/CubeRepository'
import { CreateRandomCubeService } from './CreateRandomCubeService'
import { CreateCubeService } from '../CreateCube/CreateCubeService'
import { CreateRandomCubeResponseDto } from './CreateRandomCubeDtos'

const cubeRepositoryMock: CubeRepository = {
  create: vi.fn().mockResolvedValue({
    id: { value: 'some-id' },
    y: { value: 0 },
    color: { value: 'blue' },
    x: { value: 0.5 },
    mirrored: false
  }),
  delete: vi.fn(),
  update: vi.fn(),
  list: vi.fn(),
}

const create = new CreateCubeService(cubeRepositoryMock)
const createRandom = new CreateRandomCubeService(create)

describe('src/application/CreateRandomCube/CreateRandomCubeService', () => {
  describe('execute', async () => {
    const response: CreateRandomCubeResponseDto = await createRandom.execute()

    it('should call create once', () => {
      expect(cubeRepositoryMock.create).toHaveBeenCalledOnce()
    })

    it('should return a CreateRandomCubeResponseDto', () => {
      expectTypeOf(response).toMatchTypeOf<CreateRandomCubeResponseDto>()
    })

    it('should return the correct values', async () => {
      expect(response).toEqual({
        id: 'some-id',
        x: 0.5,
        y: 0,
        color: 'blue',
        mirrored: false
      })
    })
  })
})
