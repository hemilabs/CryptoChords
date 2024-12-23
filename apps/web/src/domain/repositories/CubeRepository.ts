import { Uuid } from '@cryptochords/shared'
import { Cube } from '../entities/Cube'

export interface CubeRepository {
  list: () => Promise<Cube[]>
  create: (cube: Cube) => Promise<Cube>
  update: (cube: Cube) => Promise<Cube>
  delete: (id: Uuid) => Promise<void>
  clear: () => Promise<void>
}