interface CubeDto {
  id: string
  x: number
  y: number
  color: string
  mirrored: boolean
  age: number
}

export interface GetCubesResponseDto {
  cubes: CubeDto[]
}