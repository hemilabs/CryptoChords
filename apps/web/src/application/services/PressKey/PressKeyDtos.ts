export interface PressKeyRequest {
  pitchClass: string
  octave: number
}

export interface PressKeyResponse {
  instrument?: string
}