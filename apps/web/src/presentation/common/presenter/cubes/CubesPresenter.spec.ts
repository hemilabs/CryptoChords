import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { CreateCubeService } from '../../../../application/services/CreateCube/CreateCubeService';
import { CreateKeyboardService } from '../../../../application/services/CreateKeyboard/CreateKeyboardService';
import { GetCubesService } from '../../../../application/services/GetCubes/GetCubesService';
import { RecalculateCubePositionsService } from '../../../../application/services/RecalculateCubePositions/RecalculateCubePositionsService';
import { KeyboardRepository } from '../../../../domain/repositories/KeyboardRepository';
import { InMemoryCubeRepository } from '../../../../infrastructure/repositories/InMemoryCubeRepository';
import { InMemoryKeyboardRepository } from '../../../../infrastructure/repositories/InMemoryKeyboardRepository';
import { CubesPresenter } from './CubesPresenter';

describe('src/presentation/common/CubesPresenter', () => {
  let cubeRepository: InMemoryCubeRepository;
  let getCubesService: GetCubesService;
  let recalculateCubePositionsService: RecalculateCubePositionsService;
  let presenter: CubesPresenter;
  let keyboardRepository: KeyboardRepository;
  let createKeyboardService: CreateKeyboardService;
  let createCubeService: CreateCubeService;

  const options = {
    cubeStep: 0.001,
    maxCubeCreationInterval: 10,
    tickInterval: 5,
    timeToFirstBlock: 100,
  };

  beforeEach(async () => {
    keyboardRepository = new InMemoryKeyboardRepository();
    createKeyboardService = new CreateKeyboardService(keyboardRepository);
    await createKeyboardService.execute({
      initialOctave: 1,
      initialPitchClass: 'A',
      numberOfKeys: 88,
    });
    cubeRepository = new InMemoryCubeRepository();
    getCubesService = new GetCubesService(cubeRepository);
    recalculateCubePositionsService = new RecalculateCubePositionsService(
      cubeRepository,
    );
    createCubeService = new CreateCubeService(cubeRepository);
    presenter = new CubesPresenter(
      getCubesService,
      recalculateCubePositionsService,
      options,
    );
    await createCubeService.execute({ color: 'blue', x: 0.5 });
  });

  afterEach(() => {
    presenter.stop();
  });

  it('should move cubes up every predetermined interval', async () => {
    presenter.run();
    await new Promise(resolve => setTimeout(resolve, options.timeToFirstBlock));
    const cubes = await cubeRepository.list();
    expect(cubes[0].y.value).toBeGreaterThan(0);
  });

  it('should stop creating cubes when stopped', async () => {
    presenter.run();
    await new Promise(resolve =>
      setTimeout(resolve, options.maxCubeCreationInterval),
    );
    presenter.stop();
    const cubes = await cubeRepository.list();
    const cubesCount = cubes.length;
    await new Promise(resolve =>
      setTimeout(resolve, options.maxCubeCreationInterval),
    );
    expect(cubes.length).toBe(cubesCount);
  });

  it('should stop moving cubes when stopped', async () => {
    presenter.run();
    await new Promise(resolve => setTimeout(resolve, options.timeToFirstBlock));
    presenter.stop();
    const cubes = await cubeRepository.list();
    const firstCubeY = cubes[0].y.value;
    await new Promise(resolve => setTimeout(resolve, options.tickInterval));
    expect(cubes[0].y.value).toBe(firstCubeY);
  });

  it('should not create new runners if is already running', async () => {
    presenter.run();
    const tickLoop = presenter['tickLoop'];
    presenter.run();
    expect(presenter['tickLoop']).toBe(tickLoop);
  });
});
