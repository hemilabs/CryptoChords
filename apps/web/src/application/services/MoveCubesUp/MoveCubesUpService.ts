import { CubeRepository } from '../../../domain/repositories/CubeRepository'
import { ObservableService } from '../../ObservableService'
import { MoveCubesUpRequestDto, MoveCubesUpResponseDto } from './MoveCubesUpDtos'

export class MoveCubesUpService extends ObservableService<MoveCubesUpRequestDto, MoveCubesUpResponseDto>{
  private readonly cubeRepository: CubeRepository
  
  constructor(cubeRepository: CubeRepository) {
    super()
    this.cubeRepository = cubeRepository
  }

  protected async process(request: MoveCubesUpRequestDto): Promise<MoveCubesUpResponseDto> {
    const cubes = await this.cubeRepository.list()
    const response: MoveCubesUpResponseDto  = {
      deletedCubes: 0,
      updatedCubes: 0
    }

    for (const cube of cubes) {
      cube.moveUp(request.step)
      if(cube.isOnTop) {
        await this.cubeRepository.delete(cube.uuid)
        response.deletedCubes++
      } else {
        await this.cubeRepository.update(cube)
        response.updatedCubes++
      }
    }
    return response
  }

}
