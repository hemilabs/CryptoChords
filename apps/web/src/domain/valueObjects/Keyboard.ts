import { TxTypesEnum, ValueObject } from '@cryptochords/shared';
import { Key } from './Key';
import { KeyShapeEnum } from '../enum/KeyShapeEnum';

export interface KeyboardProps {
  keys: Key[];
}

export class Keyboard extends ValueObject<KeyboardProps> {
  private constructor(props: KeyboardProps) {
    super(props);
  }

  static create(props: KeyboardProps) {
    return new Keyboard(props);
  }

  get keys() {
    return this.props.keys;
  }

  findKey(pitchClass: string, octave: number): Key | undefined {
    return this.props.keys.find(
      key =>
        key.pitch.pitchClass.value === pitchClass &&
        key.pitch.octave === octave,
    );
  }

  getRandomWhiteKeyByTxType(txType: TxTypesEnum): Key {
    if (txType === TxTypesEnum.Btc)
      return this.getRandomWhiteKey(0, Math.floor(this.props.keys.length / 4));
    if (txType === TxTypesEnum.Eth)
      return this.getRandomWhiteKey(
        Math.floor(this.props.keys.length / 4),
        Math.floor(this.props.keys.length / 2),
      );
    if (txType === TxTypesEnum.Pop)
      return this.getRandomWhiteKey(
        Math.floor(this.props.keys.length / 2),
        Math.floor((this.props.keys.length * 3) / 4),
      );
    return this.getRandomWhiteKey(
      Math.floor((this.props.keys.length * 3) / 4),
      this.props.keys.length,
    );
  }

  getRandomKey(min: number, max: number): Key {
    const randomIndex = Math.floor(Math.random() * (max - min)) + min;
    return this.props.keys[randomIndex];
  }

  getRandomWhiteKey(min: number, max: number): Key {
    const keysInTheRange = this.props.keys.slice(min, max);
    const whiteKeys = keysInTheRange.filter(
      key => key.keyShape.value !== KeyShapeEnum.Black,
    );
    const randomIndex = Math.floor(Math.random() * whiteKeys.length);
    return whiteKeys[randomIndex];
  }
}
