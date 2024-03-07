declare module 'tonejs-instrument-organ-mp3' {
  import { Sampler } from 'tone'
  export default class InstrumentOrganMp3 extends Sampler {
    constructor(options?: {
      minify?: boolean
      onload?: unknown
    })
  }
}