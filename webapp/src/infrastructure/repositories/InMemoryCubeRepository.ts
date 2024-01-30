import { Cube } from '../../domain/entities/Cube'
import { CubeRepository } from '../../domain/repositories/CubeRepository'
import { Id } from '../../domain/valueObjects/Id'

export class InMemoryCubeRepository implements CubeRepository {
  private cubes: Map<string, Cube> = new Map()

  async list(): Promise<Cube[]> {
    return Array.from(this.cubes.values())
  }

  async create(cube: Cube): Promise<Cube> {
    this.cubes.set(cube.id.value, cube)
    return cube
  }

  async delete(id: Id): Promise<void> {
    this.cubes.delete(id.value)
  }

  async update(cube: Cube): Promise<Cube> {
    this.cubes.set(cube.id.value, cube)
    return cube
  }
}
