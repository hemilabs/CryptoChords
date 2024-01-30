import { useEffect, useState } from 'react'
import { CreateCubeService } from '../../../application/CreateCube/CreateCubeService'
import { CreateRandomCubeService } from '../../../application/CreateRandomCube/CreateRandomCubeService'
import { GetCubesService } from '../../../application/GetCubes/GetCubesService'
import { MoveCubesUpService } from '../../../application/MoveCubesUp/MoveCubesUpService'
import { InMemoryCubeRepository } from '../../../infrastructure/repositories/InMemoryCubeRepository'
import { CubesPresenter } from '../../common/CubesPresenter'
import { CubesPresenterState } from '../../common/CubesPresenterState'
import { Cube } from './Cube'

const cubeRepository = new InMemoryCubeRepository()
const getCubesService = new GetCubesService(cubeRepository)
const createCubeService = new CreateCubeService(cubeRepository)
const createRandomCubeService = new CreateRandomCubeService(createCubeService)
const moveCubesUpService = new MoveCubesUpService(cubeRepository)
const presenter = new CubesPresenter(getCubesService, createRandomCubeService, moveCubesUpService)

export const Cubes = function (props: {
  className?: string
  centerPositioning?: boolean
  yMultiplier?: number
  bottomOffset?: number
}) {

  const [state, setState] = useState<CubesPresenterState>(presenter.state)

  useEffect(() => {
    presenter.subscribe(setState)
    presenter.run()
  }, [])
  
  return (
    <div className={`${props.className ?? ''}`}>
      {state.cubes
        .map((cube, index) => {
          return (
            <Cube
              key={index}
              color={cube.color}
              style={{
                left: `${cube.x * 100}%`,
                bottom: `${(cube.y * (props.yMultiplier ?? 1) - (props.bottomOffset ?? 0)) * 100}%`,
              }}
              centerPositioning={props.centerPositioning}
              mirrored={cube.mirrored}
            />
          )
        })}
    </div>
  )
}
