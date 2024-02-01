import { CubeRepository } from '../../domain/repositories/CubeRepository'
import { GetCubesResponseDto } from './GetCubesDtos'

export class GetCubesService {
  private readonly cubeRepository: CubeRepository
  
  constructor(cubeRepository: CubeRepository) {
    this.cubeRepository = cubeRepository
  }

  async execute(): Promise<GetCubesResponseDto> {
    const cubes = await this.cubeRepository.list()

    return {
      cubes: cubes.map(cube => ({
        id: cube.id.value,
        x: cube.x.value,
        y: cube.y.value,
        color: cube.color.value,
        mirrored: cube.mirrored
      }))
    }
  }
}