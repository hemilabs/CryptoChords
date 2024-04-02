export interface RecalculateCubePositionsRequestDto {
  maxAge: number
}

export interface RecalculateCubePositionsResponseDto {
  deletedCubes: number
  updatedCubes: number
}
