import { Cube } from '../../domain/entities/Cube'
import { CreateCubeService } from '../CreateCube/CreateCubeService'
import { CreateRandomCubeResponseDto } from './CreateRandomCubeDtos'

export class CreateRandomCubeService {
  private readonly createCubeService: CreateCubeService
  
  constructor(createCubeService: CreateCubeService) {
    this.createCubeService = createCubeService
  }

  async execute(): Promise<CreateRandomCubeResponseDto> {
    const cube = Cube.random()
    return this.createCubeService.execute({
      color: cube.color.value,
      x: cube.x.value
    })
  }
}