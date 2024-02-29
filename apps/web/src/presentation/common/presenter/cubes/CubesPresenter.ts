import { GetCubesService } from '../../../../application/services/GetCubes/GetCubesService'
import { MoveCubesUpService } from '../../../../application/services/MoveCubesUp/MoveCubesUpService'
import { Presenter } from '../../base/Presenter'
import { CubesPresenterState } from './CubesPresenterState'

const initalState: CubesPresenterState = {
  cubes: [],
}

interface CubesPresenterOptions {
  maxCubeCreationInterval: number
  tickInterval: number
  cubeStep: number
}

const defaultOptions: CubesPresenterOptions = {
  maxCubeCreationInterval: 300,
  tickInterval: 20,
  cubeStep: 0.001
}

export class CubesPresenter extends Presenter<CubesPresenterState> {

  private readonly getCubesService: GetCubesService
  private readonly moveCubesUpService: MoveCubesUpService

  private options: CubesPresenterOptions

  private tickLoop: NodeJS.Timeout | undefined


  constructor(
    getCubesService: GetCubesService,
    moveCubesUpService: MoveCubesUpService,
    options?: Partial<CubesPresenterOptions>
  ) {
    super(initalState)
    this.getCubesService = getCubesService
    this.moveCubesUpService = moveCubesUpService
    this.options = {
      ...defaultOptions,
      ...options
    }

    this.run()
  }

  async run() {
    if (this.isRunning()) {
      return
    }
    this.runTickLoop()
  }

  stop() {
    this.stopTickLoop()
  }

  private isRunning() {
    return !!this.tickLoop
  }

  private stopTickLoop() {
    if (this.tickLoop) {
      clearInterval(this.tickLoop)
      this.tickLoop = undefined
    }
  }

  private runTickLoop() {
    this.tickLoop = setInterval(async () => {
      await this.moveAllCubesUp()
      await this.syncState()
    }, this.options.tickInterval)
  }

  private async moveAllCubesUp() {
    await this.moveCubesUpService.execute({
      step: this.options.cubeStep
    })
  }

  private async syncState() {
    const getCubesResponse = await this.getCubesService.execute()
    this.changeState({
      cubes: getCubesResponse.cubes
    })
  }
}
