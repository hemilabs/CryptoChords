import { InMemoryCubeRepository } from './InMemoryCubeRepository'
import { Cube } from '../../domain/entities/Cube'
import { beforeEach, describe, expect, it } from 'vitest'
import { Uuid } from '@cryptochords/shared'

describe('src/infrastructure/repositories/InMemoryCubeRepository', () => {
  let repository: InMemoryCubeRepository

  beforeEach(() => {
    repository = new InMemoryCubeRepository()
  })

  describe('list', () => {
    it('should return an empty array when no cubes are stored', async () => {
      const cubes = await repository.list()
      expect(cubes).toEqual([])
    })
  })

  describe('create', () => {
    it('should store the cube and return it', async () => {
      const cube: Cube = Cube.random()
      const createdCube = await repository.create(cube)
      expect(createdCube).toEqual(cube)
    })
  })

  describe('delete', () => {
    it('should remove the cube with the given id', async () => {
      const cube: Cube = Cube.random()
      await repository.create(cube)
      await repository.delete(cube.uuid)
      const cubes = await repository.list()
      expect(cubes).toEqual([])
    })
  })

  describe('update', () => {
    it('should update the cube and return it', async () => {
      const id = Uuid.create()
      const cube: Cube = {
        uuid: id,
        x: { value: 0.5 },
        y: { value: 0 },
        color: { value: 'blue' },
        mirrored: false,
      } as Cube
      await repository.create(cube)

      const updatedCube = {
        uuid: id,
        x: { value: 0.7 },
        y: { value: 0.1 },
        color: { value: 'orange' },
        mirrored: true,
      } as Cube

      const result = await repository.update(updatedCube)
      expect(result).toEqual(updatedCube)
      expect(await repository.list()).toEqual([updatedCube])
    })
  })
})
