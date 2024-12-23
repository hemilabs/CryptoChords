import { describe, expect, it, vi } from 'vitest'
import { CubeRepository } from '../../../domain/repositories/CubeRepository'
import { CreateCubeService } from './CreateCubeService'

const cubeRepositoryMock: CubeRepository = {
  create: vi.fn().mockResolvedValue({
    uuid: { value: 'some-id' },
    x: { value: 0.5 },
    y: { value: 0 },
    color: { value: 'blue' },
    mirrored: false
  }),
  delete: vi.fn(),
  update: vi.fn(),
  list: vi.fn(),
  clear: vi.fn()
}

const create: CreateCubeService = new CreateCubeService(cubeRepositoryMock)

describe('src/application/CreateCube/CreateCubeService', () => {
  describe('execute', () => {
    it('should return ', async () => {
      const response = await create.execute({ color: 'blue', x: 0.5 })
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
