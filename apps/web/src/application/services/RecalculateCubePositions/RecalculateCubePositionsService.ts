import { CubeRepository } from '../../../domain/repositories/CubeRepository'
import { ObservableService } from '../../ObservableService'
import { RecalculateCubePositionsRequestDto, RecalculateCubePositionsResponseDto } from './RecalculateCubePositionsDtos'

export class RecalculateCubePositionsService extends ObservableService<RecalculateCubePositionsRequestDto, RecalculateCubePositionsResponseDto>{
  private readonly cubeRepository: CubeRepository
  
  constructor(cubeRepository: CubeRepository) {
    super()
    this.cubeRepository = cubeRepository
  }

  protected async process(request: RecalculateCubePositionsRequestDto): Promise<RecalculateCubePositionsResponseDto> {
    const cubes = await this.cubeRepository.list()
    const response: RecalculateCubePositionsResponseDto  = {
      deletedCubes: 0,
      updatedCubes: 0
    }

    for await(const cube of cubes) {
      cube.recalculateYByAge(request.maxAge)
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
