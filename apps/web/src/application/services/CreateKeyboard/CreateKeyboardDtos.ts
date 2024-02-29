export interface CreateKeyboardRequestDto {
  numberOfKeys: number
  initialPitchClass: string
  initialOctave: number
}

export interface CreateKeyboardResponseDto {
  keys: {
    pitch: {
      class: string
      octave: number
    }
    keyShape: string,
    x: number
    color?: string
  }[]
}
