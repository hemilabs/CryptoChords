/* eslint-disable complexity */
/* eslint-disable consistent-return */
import { KeyShapeEnum } from '../enum/KeyShapeEnum';
import { PitchClassEnum } from '../enum/PitchClassEnum';
import { TransactionColorEnum } from '../enum/TransactionColorEnum';
import { Key, KeyProps } from '../valueObjects/Key';
import { KeyShape } from '../valueObjects/KeyShape';
import { Keyboard } from '../valueObjects/Keyboard';
import { Pitch } from '../valueObjects/Pitch';
import { PitchClass } from '../valueObjects/PitchClass';
import { UnitInterval } from '../valueObjects/UnitInterval';

enum KeyPosition {
  Beginning,
  Middle,
  End,
}

export interface CreateProps {
  numberOfKeys: number;
  initialPitchClass: PitchClassEnum;
  initialOctave: number;
}

export class KeyboardFactory {
  static create(props: CreateProps) {
    const keysProps: Pick<
      KeyProps,
      'color' | 'keyShape' | 'pitch' | 'pressed'
    >[] = [];
    let pitchClassValue = props.initialPitchClass;
    let octave = props.initialOctave;
    for (let i = 0; i < props.numberOfKeys; i++) {
      const isLastKey = i === props.numberOfKeys - 1;
      const isFirstKey = i === 0;
      const position = isFirstKey
        ? KeyPosition.Beginning
        : isLastKey
          ? KeyPosition.End
          : KeyPosition.Middle;
      const keyShape = KeyShape.create(
        KeyboardFactory.getKeyShape(pitchClassValue, position),
      );
      const pitchClass = PitchClass.create(pitchClassValue);
      const pitch = Pitch.create({ octave, pitchClass });
      const color = KeyboardFactory.getColor(props.numberOfKeys, i);
      const key = { color, keyShape, pitch, pressed: false };
      keysProps.push(key);
      pitchClassValue = KeyboardFactory.getNextNoteEnum(pitchClassValue);
      if (pitchClassValue === PitchClassEnum.C) {
        octave++;
      }
    }

    const keysPropsWithX = this.calculatePositions(keysProps);

    const keys = keysPropsWithX.map(key => Key.create(key));
    return Keyboard.create({ keys });
  }

  private static getColor(numberOfKeys: number, keyNumber: number) {
    const quarter = numberOfKeys / 4;
    const keyQuarter = Math.floor(keyNumber / quarter);

    return Object.values(TransactionColorEnum)[keyQuarter];
  }

  private static calculatePositions(
    keysProps: Pick<KeyProps, 'color' | 'keyShape' | 'pitch' | 'pressed'>[],
  ) {
    const whiteKeysCount = keysProps.filter(
      key => key.keyShape.value !== KeyShapeEnum.Black,
    ).length;
    const minKeyCenterSpacing = 1 / (whiteKeysCount * 2 - 1);
    const result = [];
    let x = 0;
    for (let i = 0; i < keysProps.length; i++) {
      const shape = keysProps[i].keyShape.value;
      if (i === 0) {
        x += minKeyCenterSpacing * 0.75;
      } else if (
        shape === KeyShapeEnum.WhiteLeft ||
        shape === KeyShapeEnum.White
      ) {
        x += minKeyCenterSpacing * 2;
      } else {
        x += minKeyCenterSpacing;
      }
      result.push({ ...keysProps[i], x: UnitInterval.create(x) });
    }
    return result;
  }

  private static getNextNoteEnum(pitchClass: PitchClassEnum) {
    switch (pitchClass) {
      case PitchClassEnum.C:
        return PitchClassEnum.C_SHARP;
      case PitchClassEnum.C_SHARP:
        return PitchClassEnum.D;
      case PitchClassEnum.D:
        return PitchClassEnum.D_SHARP;
      case PitchClassEnum.D_SHARP:
        return PitchClassEnum.E;
      case PitchClassEnum.E:
        return PitchClassEnum.F;
      case PitchClassEnum.F:
        return PitchClassEnum.F_SHARP;
      case PitchClassEnum.F_SHARP:
        return PitchClassEnum.G;
      case PitchClassEnum.G:
        return PitchClassEnum.G_SHARP;
      case PitchClassEnum.G_SHARP:
        return PitchClassEnum.A;
      case PitchClassEnum.A:
        return PitchClassEnum.A_SHARP;
      case PitchClassEnum.A_SHARP:
        return PitchClassEnum.B;
      case PitchClassEnum.B:
        return PitchClassEnum.C;
    }
  }

  private static getKeyShape(
    pitchClass: PitchClassEnum,
    position: KeyPosition,
  ): KeyShapeEnum {
    if (pitchClass === PitchClassEnum.C || pitchClass === PitchClassEnum.F) {
      if (position === KeyPosition.End) {
        return KeyShapeEnum.White;
      }
      return KeyShapeEnum.WhiteLeft;
    }

    if (pitchClass === PitchClassEnum.E || pitchClass === PitchClassEnum.B) {
      if (position === KeyPosition.Beginning) {
        return KeyShapeEnum.White;
      }
      return KeyShapeEnum.WhiteRight;
    }

    if (
      pitchClass === PitchClassEnum.D ||
      pitchClass === PitchClassEnum.G ||
      pitchClass === PitchClassEnum.A
    ) {
      if (position === KeyPosition.End) {
        return KeyShapeEnum.WhiteRight;
      }
      if (position === KeyPosition.Beginning) {
        return KeyShapeEnum.WhiteLeft;
      }
      return KeyShapeEnum.WhiteMiddle;
    }

    return KeyShapeEnum.Black;
  }
}
