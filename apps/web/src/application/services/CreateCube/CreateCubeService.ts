import { Cube } from '../../../domain/entities/Cube';
import { TransactionColorEnum } from '../../../domain/enum/TransactionColorEnum';
import { CubeRepository } from '../../../domain/repositories/CubeRepository';
import { TransactionColor } from '../../../domain/valueObjects/TransactionColor';
import { UnitInterval } from '../../../domain/valueObjects/UnitInterval';
import { ObservableService } from '../../ObservableService';
import { CreateCubeRequestDto, CreateCubeResponseDto } from './CreateCubeDtos';

export class CreateCubeService extends ObservableService<
  CreateCubeRequestDto,
  CreateCubeResponseDto
> {
  private readonly cubeRepository: CubeRepository;

  constructor(cubeRepository: CubeRepository) {
    super();
    this.cubeRepository = cubeRepository;
  }

  protected async process(
    request: CreateCubeRequestDto,
  ): Promise<CreateCubeResponseDto> {
    const cube = Cube.create(
      TransactionColor.create(request.color as TransactionColorEnum),
      UnitInterval.create(request.x),
    );
    const createdCube = await this.cubeRepository.create(cube);
    return {
      color: createdCube.color.value,
      id: createdCube.uuid.value,
      mirrored: createdCube.mirrored,
      x: createdCube.x.value,
      y: createdCube.y.value,
    };
  }
}
