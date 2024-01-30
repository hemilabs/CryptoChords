import { CreateRandomCubeService } from '../../application/CreateRandomCube/CreateRandomCubeService'
import { GetCubesService } from '../../application/GetCubes/GetCubesService'
import { MoveCubesUpService } from '../../application/MoveCubesUp/MoveCubesUpService'
import { CubesPresenterState } from './CubesPresenterState'
import { Presenter } from './base/Presenter'

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
  private readonly createCubeService: CreateRandomCubeService
  private readonly moveCubesUpService: MoveCubesUpService

  private options: CubesPresenterOptions
  
  private creationLoop: NodeJS.Timeout | undefined
  private tickLoop: NodeJS.Timeout | undefined


  constructor(
    getCubesService: GetCubesService,
    createRandomCubeService: CreateRandomCubeService,
    moveCubesUpService: MoveCubesUpService,
    options?: Partial<CubesPresenterOptions>
  ) {
    super(initalState)
    this.getCubesService = getCubesService
    this.createCubeService = createRandomCubeService
    this.moveCubesUpService = moveCubesUpService
    this.options = {
      ...defaultOptions,
      ...options
    }
  }

  run() {
    if(this.isRunning()) {
      return
    }
    this.runCreationLoop()
    this.runTickLoop()
  }

  stop() {
    this.stopCreationLoop()
    this.stopTickLoop()
  }

  private isRunning() {
    return !!this.creationLoop && !!this.tickLoop
  }

  private stopCreationLoop() {
    if (this.creationLoop) {
      clearInterval(this.creationLoop)
      this.creationLoop = undefined
    }
  }

  private stopTickLoop() {
    if (this.tickLoop) {
      clearInterval(this.tickLoop)
      this.tickLoop = undefined
    }
  }

  private runCreationLoop() {
    this.creationLoop = setInterval(async () => {
      await this.createCubeService.execute()
    }, Math.floor(Math.random() * this.options.maxCubeCreationInterval))
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
