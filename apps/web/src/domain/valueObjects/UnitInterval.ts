import { ValueObject } from '@cryptochords/shared';
import { InvalidUnitIntervalError } from '../errors/InvalidUnitIntervalError';

interface UnitIntevalProps {
  value: number;
}

export class UnitInterval extends ValueObject<UnitIntevalProps> {
  private constructor(value: number) {
    super({ value });
  }

  static create(value: number) {
    if (typeof value !== 'number' || value < 0 || value > 1) {
      throw new InvalidUnitIntervalError();
    }

    return new UnitInterval(value);
  }

  static random(min?: number, max?: number): UnitInterval {
    if (min === undefined) {
      return this.random(0, max);
    }

    if (max == undefined) {
      return this.random(min, 1);
    }

    const minSanitized = Math.max(0, min);
    const maxSanitized = Math.min(1, max);

    return this.create(
      Math.random() * (maxSanitized - minSanitized) + minSanitized,
    );
  }

  increment(value: number) {
    return UnitInterval.create(Math.min(this.props.value + value, 1));
  }

  isMaxReached() {
    return this.props.value === 1;
  }

  get value() {
    return this.props.value;
  }
}
