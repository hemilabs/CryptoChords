export interface GetKeyboardResponseDto {
  keys: {
    pitch: {
      class: string;
      octave: number;
    };
    keyShape: string;
    x: number;
    color: string;
    pressed: boolean;
  }[];
}
