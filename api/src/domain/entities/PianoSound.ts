import { Entity } from '../base/Entity'
import { Address } from '../valueObjects/Address'
import { PianoChord } from '../valueObjects/PianoChord'
import { TxType } from '../valueObjects/Txtype'

interface PianoSoundProps {
  txType: TxType
  address: Address
  pianoChord: PianoChord
}

export class PianoSound extends Entity<PianoSoundProps> {
  private constructor(props: PianoSoundProps) {
    super(props)
  }
  
  static create(props: PianoSoundProps): PianoSound {
    return new PianoSound(props)
  }

  get txType(): string {
    return this.props.txType.value
  }

  get address(): string {
    return this.props.address.value
  }

  get pianoChord(): string {
    return this.props.pianoChord.value
  }
}
