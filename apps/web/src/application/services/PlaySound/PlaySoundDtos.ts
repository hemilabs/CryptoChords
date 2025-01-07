export interface PlaySoundRequest {
  pitchClass: string;
  octave: number;
}

export interface PlaySoundResponse {
  instrument?: string;
}
