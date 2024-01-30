import { Cube } from '../entities/Cube'
import { Id } from '../valueObjects/Id'

export interface CubeRepository {
  list: () => Promise<Cube[]>
  create: (cube: Cube) => Promise<Cube>
  update: (cube: Cube) => Promise<Cube>
  delete: (id: Id) => Promise<void>
}