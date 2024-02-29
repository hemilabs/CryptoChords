import { CubeRepository } from '../../../domain/repositories/CubeRepository'
import { ObservableService } from '../../ObservableService'
import { GetCubesResponseDto } from './GetCubesDtos'

export class GetCubesService extends ObservableService<void, GetCubesResponseDto>{
  private readonly cubeRepository: CubeRepository
  
  constructor(cubeRepository: CubeRepository) {
    super()
    this.cubeRepository = cubeRepository
  }

  protected async process(): Promise<GetCubesResponseDto> {
    const cubes = await this.cubeRepository.list()

    return {
      cubes: cubes.map(cube => ({
        id: cube.uuid.value,
        x: cube.x.value,
        y: cube.y.value,
        color: cube.color.value,
        mirrored: cube.mirrored,
        age: cube.age
      }))
    }
  }
}