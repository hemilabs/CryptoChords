interface CubeDto {
  id: string
  x: number
  y: number
  color: string
  mirrored: boolean
}

export interface GetCubesResponseDto {
  cubes: CubeDto[]
}