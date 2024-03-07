declare module 'tonejs-instrument-harmonium-mp3' {
  import { Sampler } from 'tone'
  export default class InstrumentHarmoniumMp3 extends Sampler {
    constructor(options?: {
      minify?: boolean
      onload?: unknown
    })
  }
}