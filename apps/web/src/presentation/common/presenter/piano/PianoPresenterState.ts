export type PianoPresenterState = {
  keys: {
    pitch: {
      class: string
      octave: number
    }
    keyShape: string
    x: number
  }[]
}
