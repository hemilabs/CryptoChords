import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { CreateCubeService } from '../../../../application/CreateCube/CreateCubeService'
import { CreateRandomCubeService } from '../../../../application/CreateRandomCube/CreateRandomCubeService'
import { GetCubesService } from '../../../../application/GetCubes/GetCubesService'
import { MoveCubesUpService } from '../../../../application/MoveCubesUp/MoveCubesUpService'
import { InMemoryCubeRepository } from '../../../../infrastructure/repositories/InMemoryCubeRepository'
import { CubesPresenter } from './CubesPresenter'

describe('src/presentation/common/CubesPresenter', () => {
  let cubeRepository: InMemoryCubeRepository
  let getCubesService: GetCubesService
  let createCubeService: CreateCubeService
  let createRandomCubeService: CreateRandomCubeService
  let moveCubesUpService: MoveCubesUpService
  let presenter: CubesPresenter
  const options = {
    maxCubeCreationInterval: 10,
    tickInterval: 5,
    cubeStep: 0.001
  }

  beforeEach(() => {
    cubeRepository = new InMemoryCubeRepository()
    getCubesService = new GetCubesService(cubeRepository)
    createCubeService = new CreateCubeService(cubeRepository)
    createRandomCubeService = new CreateRandomCubeService(createCubeService)
    moveCubesUpService = new MoveCubesUpService(cubeRepository)
    presenter = new CubesPresenter(getCubesService, createRandomCubeService, moveCubesUpService, options)
  })

  afterEach(() => {
    presenter.stop()
  })

  it('should create at least a random cube every in the predetermined interval', async () => {
    presenter.run()
    await new Promise(resolve => setTimeout(resolve, 3 * options.maxCubeCreationInterval))
    const cubes = await cubeRepository.list()
    expect(cubes.length).toBeGreaterThanOrEqual(3)
  })

  it('should move cubes up every predetermined interval', async () => {
    presenter.run()
    await new Promise(resolve => setTimeout(resolve, options.maxCubeCreationInterval + options.tickInterval))
    const cubes = await cubeRepository.list()
    expect(cubes[0].y.value).toBeGreaterThan(0)
  })

  it('should stop creating cubes when stopped', async () => {
    presenter.run()
    await new Promise(resolve => setTimeout(resolve, options.maxCubeCreationInterval))
    presenter.stop()
    const cubes = await cubeRepository.list()
    const cubesCount = cubes.length
    await new Promise(resolve => setTimeout(resolve, options.maxCubeCreationInterval))
    expect(cubes.length).toBe(cubesCount)
  })

  it('should stop moving cubes when stopped', async () => {
    presenter.run()
    await new Promise(resolve => setTimeout(resolve, options.maxCubeCreationInterval + options.tickInterval))
    presenter.stop()
    const cubes = await cubeRepository.list()
    const firstCubeY = cubes[0].y.value
    await new Promise(resolve => setTimeout(resolve, options.tickInterval))
    expect(cubes[0].y.value).toBe(firstCubeY)
  })

  it('should not create new runners if is already running', async () => {
    presenter.run()
    const creationLoop = presenter['creationLoop']
    const tickLoop = presenter['tickLoop']
    presenter.run()
    expect(presenter['creationLoop']).toBe(creationLoop)
    expect(presenter['tickLoop']).toBe(tickLoop)
  })
})
