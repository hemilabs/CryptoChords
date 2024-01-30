import { CubeRepository } from '../../domain/repositories/CubeRepository'
import { MoveCubesUpRequestDto, MoveCubesUpResponseDto } from './MoveCubesUpDtos'

export class MoveCubesUpService {
  private readonly cubeRepository: CubeRepository
  
  constructor(cubeRepository: CubeRepository) {
    this.cubeRepository = cubeRepository
  }

  async execute(request: MoveCubesUpRequestDto): Promise<MoveCubesUpResponseDto> {
    const cubes = await this.cubeRepository.list()
    const response: MoveCubesUpResponseDto  = {
      deletedCubes: 0,
      updatedCubes: 0
    }

    for (const cube of cubes) {
      cube.moveUp(request.step)
      if(cube.isOnTop) {
        await this.cubeRepository.delete(cube.id)
        response.deletedCubes++
      } else {
        await this.cubeRepository.update(cube)
        response.updatedCubes++
      }
    }
    return response
  }

}
