declare module 'tonejs-instrument-saxophone-mp3' {
  import { Sampler } from 'tone'
  export default class InstrumentSaxophoneMp3 extends Sampler {
    constructor(options?: {
      minify?: boolean
      onload?: unknown
    })
  }
}