import { ValueObject } from '@cryptochords/shared';
import { PitchClass } from './PitchClass';

export interface PitchProps {
  pitchClass: PitchClass;
  octave: number;
}

export class Pitch extends ValueObject<PitchProps> {
  private constructor(props: PitchProps) {
    super(props);
  }

  static create(props: PitchProps) {
    return new Pitch(props);
  }

  get pitchClass() {
    return this.props.pitchClass;
  }

  get octave() {
    return this.props.octave;
  }

  get next() {
    const nextClass = this.props.pitchClass.next;
    return Pitch.create({
      octave:
        nextClass.value === 'C' ? this.props.octave + 1 : this.props.octave,
      pitchClass: nextClass,
    });
  }

  get previous() {
    const previousClass = this.props.pitchClass.previous;
    return Pitch.create({
      octave:
        previousClass.value === 'B' ? this.props.octave - 1 : this.props.octave,
      pitchClass: previousClass,
    });
  }

  isBefore(pitch: Pitch) {
    return (
      this.props.octave < pitch.octave ||
      (this.props.octave === pitch.octave &&
        this.props.pitchClass.value < pitch.pitchClass.value)
    );
  }

  isAfter(pitch: Pitch) {
    return (
      this.props.octave > pitch.octave ||
      (this.props.octave === pitch.octave &&
        this.props.pitchClass.value > pitch.pitchClass.value)
    );
  }

  equals(pitch: Pitch) {
    return (
      this.props.octave === pitch.octave &&
      this.props.pitchClass.value === pitch.pitchClass.value
    );
  }

  toString() {
    return `${this.props.pitchClass.value}${this.props.octave}`;
  }

  static random(min: Pitch, max: Pitch) {
    const range = Pitch.range(min, max);
    return range[Math.floor(Math.random() * range.length)];
  }

  static range(min: Pitch, max: Pitch): Pitch[] {
    if (min.isAfter(max)) {
      throw new Error('Min pitch must be before max pitch');
    }

    const possibleValues: Pitch[] = [];
    let current = min;
    while (!current.isAfter(max)) {
      possibleValues.push(current);
      current = current.next;
    }

    return possibleValues;
  }
}
