import { useContext } from 'react'
import { CubesPresenter } from '../../common/presenter/cubes/CubesPresenter'
import { CubesPresenterState } from '../../common/presenter/cubes/CubesPresenterState'
import { presenters } from '../context'
import { usePresenter } from '../hooks/usePresenter'
import { Cube } from './Cube'

export const Cubes = function (props: {
  className?: string
  centerPositioning?: boolean
  yMultiplier?: number
  bottomOffset?: number
}) {
  const { cubesPresenter } = useContext(presenters)
  const { cubes } = usePresenter<CubesPresenter, CubesPresenterState>(cubesPresenter)

  return (
    <div className={`${props.className ?? ''}`}>
      {cubes
        .map((cube) => {
          return (
            <Cube
              key={cube.id}
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
