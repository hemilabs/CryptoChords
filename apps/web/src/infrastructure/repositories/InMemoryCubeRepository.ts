import { Uuid } from '@cryptochords/shared'
import { Cube } from '../../domain/entities/Cube'
import { CubeRepository } from '../../domain/repositories/CubeRepository'

export class InMemoryCubeRepository implements CubeRepository {
  private cubes: Map<string, Cube> = new Map()

  async list(): Promise<Cube[]> {
    return Array.from(this.cubes.values())
  }

  async create(cube: Cube): Promise<Cube> {
    this.cubes.set(cube.uuid.value, cube)
    return cube
  }

  async delete(id: Uuid): Promise<void> {
    this.cubes.delete(id.value)
  }

  async update(cube: Cube): Promise<Cube> {
    this.cubes.set(cube.uuid.value, cube)
    return cube
  }
}
