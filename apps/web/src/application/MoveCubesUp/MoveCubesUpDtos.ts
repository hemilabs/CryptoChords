export interface MoveCubesUpRequestDto {
  step: number
}

export interface MoveCubesUpResponseDto {
  deletedCubes: number
  updatedCubes: number
}
