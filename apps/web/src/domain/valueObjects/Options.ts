import { ValueObject } from '@cryptochords/shared';
import { Instrument } from './Instrument';
import { InstrumentEnum } from '../enum/InstrumentEnum';

export interface OptionsProps {
  muted: boolean;
  instrument: Instrument;
}

export interface OptionsJSON {
  muted: boolean;
  instrument: string;
}

export class Options extends ValueObject<OptionsProps> {
  private constructor(props: OptionsProps) {
    super(props);
  }

  static create(props: OptionsProps) {
    return new Options(props);
  }

  get muted() {
    return this.props.muted;
  }

  get instrument() {
    return this.props.instrument;
  }

  toJSON(): OptionsJSON {
    return {
      instrument: this.props.instrument.name,
      muted: this.props.muted,
    };
  }

  static fromJSON(json: OptionsJSON) {
    return Options.create({
      instrument: Instrument.create({
        name: json.instrument as InstrumentEnum,
      }),
      muted: json.muted,
    });
  }
}
