import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import { CubeRepository } from '../../../domain/repositories/CubeRepository'
import { MoveCubesUpService } from './MoveCubesUpService'
import { MoveCubesUpResponseDto } from './MoveCubesUpDtos'

const moveUp = vi.fn().mockImplementation(
  function (this: { y: { value: number } }, step: number) {
    this.y.value += step
  })

const cubeRepositoryMock: CubeRepository = {
  create: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
  list: vi.fn().mockResolvedValue([
    {
      uuid: { value: 'some-id' },
      x: { value: 0.5 },
      y: { value: 0.9 },
      color: { value: 'blue' },
      mirrored: false,
      isOnTop: true,
      moveUp
    }, {
      uuid: { value: 'another-id' },
      x: { value: 0.1 },
      y: { value: 0 },
      color: { value: 'orange' },
      mirrored: false,
      isOnTop: false,
      moveUp
    }]),
}

const move = new MoveCubesUpService(cubeRepositoryMock)

describe('src/application/MoveCubesUp/MoveCubesUpService', () => {
  describe('execute', async () => {
    const response: MoveCubesUpResponseDto = await move.execute({
      step: 0.1
    })

    it('should call list once', () => {
      expect(cubeRepositoryMock.list).toHaveBeenCalledOnce()
    })

    it('should return a MoveCubesUpResponseDto', () => {
      expectTypeOf(response).toMatchTypeOf<MoveCubesUpResponseDto>()
    })

    it('should call update once', () => {
      expect(cubeRepositoryMock.update).toHaveBeenCalledOnce()
    })

    it('should call delete once', () => {
      expect(cubeRepositoryMock.delete).toHaveBeenCalledOnce()
    })

    it('should call moveUp twice', () => {
      expect(moveUp).toHaveBeenCalledTimes(2)
    })

    it('show call delete with the correct id', () => {
      expect(cubeRepositoryMock.delete).toHaveBeenCalledWith({ value: 'some-id' })
    })

    it('show call update with the correct id', () => {
      expect(cubeRepositoryMock.update).toHaveBeenCalledWith({
        uuid: { value: 'another-id' },
        x: { value: 0.1 },
        y: { value: 0.1 },
        color: { value: 'orange' },
        mirrored: false,
        isOnTop: false,
        moveUp
      })
    })
  })
})
