import { GetCubesService } from '../../../../application/services/GetCubes/GetCubesService';
import { RecalculateCubePositionsService } from '../../../../application/services/RecalculateCubePositions/RecalculateCubePositionsService';
import { Presenter } from '../../base/Presenter';
import { CubesPresenterState } from './CubesPresenterState';

const initalState: CubesPresenterState = {
  cubes: [],
};

interface CubesPresenterOptions {
  maxCubeCreationInterval: number;
  tickInterval: number;
  maxCubeAge: number;
}

const defaultOptions: CubesPresenterOptions = {
  maxCubeAge: 17_000,
  maxCubeCreationInterval: 300,
  tickInterval: 20,
};

export class CubesPresenter extends Presenter<CubesPresenterState> {
  private readonly getCubesService: GetCubesService;
  private readonly recalculateCubePositions: RecalculateCubePositionsService;

  private options: CubesPresenterOptions;

  private tickLoop: NodeJS.Timeout | undefined;

  constructor(
    getCubesService: GetCubesService,
    recalculateCubePositions: RecalculateCubePositionsService,
    options?: Partial<CubesPresenterOptions>,
  ) {
    super(initalState);
    this.getCubesService = getCubesService;
    this.recalculateCubePositions = recalculateCubePositions;
    this.options = {
      ...defaultOptions,
      ...options,
    };

    this.run();
  }

  async run() {
    if (this.isRunning()) {
      return;
    }
    this.runTickLoop();
  }

  stop() {
    this.stopTickLoop();
  }

  private isRunning() {
    return !!this.tickLoop;
  }

  private stopTickLoop() {
    if (this.tickLoop) {
      clearInterval(this.tickLoop);
      this.tickLoop = undefined;
    }
  }

  private runTickLoop() {
    this.tickLoop = setInterval(async () => {
      await this.moveAllCubesUp();
      await this.syncState();
    }, this.options.tickInterval);
  }

  private async moveAllCubesUp() {
    await this.recalculateCubePositions.execute({
      maxAge: this.options.maxCubeAge,
    });
  }

  private async syncState() {
    const getCubesResponse = await this.getCubesService.execute();
    this.changeState({
      cubes: getCubesResponse.cubes,
    });
  }
}
