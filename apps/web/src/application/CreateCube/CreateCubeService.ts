import { Cube } from '../../domain/entities/Cube'
import { CubeColorEnum } from '../../domain/enum/CubeColorEnum'
import { CubeRepository } from '../../domain/repositories/CubeRepository'
import { CubeColor } from '../../domain/valueObjects/CubeColor'
import { UnitInterval } from '../../domain/valueObjects/UnitInterval'
import { CreateCubeRequestDto, CreateCubeResponseDto } from './CreateCubeDtos'

export class CreateCubeService {
  private readonly cubeRepository: CubeRepository
  
  constructor(cubeRepository: CubeRepository) {
    this.cubeRepository = cubeRepository
  }

  async execute(request: CreateCubeRequestDto): Promise<CreateCubeResponseDto> {
    const cube = Cube.create(CubeColor.create(request.color as CubeColorEnum), UnitInterval.create(request.x))
    const createdCube = await this.cubeRepository.create(cube)
    return {
      id: createdCube.id.value,
      x: createdCube.x.value,
      y: createdCube.y.value,
      color: createdCube.color.value,
      mirrored: createdCube.mirrored
    }
  }
}