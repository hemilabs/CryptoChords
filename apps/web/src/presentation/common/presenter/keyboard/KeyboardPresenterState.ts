export type KeyboardPresenterState = {
  keys: {
    pitch: {
      class: string;
      octave: number;
    };
    keyShape: string;
    x: number;
    color?: string;
  }[];
};
