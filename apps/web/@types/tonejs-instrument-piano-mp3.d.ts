declare module 'tonejs-instrument-piano-mp3' {
  import { Sampler } from 'tone'
  export default class InstrumentPianoMp3 extends Sampler {
    constructor(options?: {
      minify?: boolean
      onload?: unknown
    })
  }
}