export interface CreateCubeResponseDto {
  id: string
  x: number
  y: number
  color: string 
  mirrored: boolean
}

export interface CreateCubeRequestDto {
  x: number,
  color: string
}