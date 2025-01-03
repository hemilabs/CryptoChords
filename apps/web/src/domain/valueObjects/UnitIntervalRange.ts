import { ValueObject } from '@cryptochords/shared';
import { UnitInterval } from './UnitInterval';

interface UnitIntevalRangeProps {
  min: UnitInterval;
  max: UnitInterval;
}

export class UnitIntervalRange extends ValueObject<UnitIntevalRangeProps> {
  private constructor(min: UnitInterval, max: UnitInterval) {
    super({ max, min });
  }

  static create(min: number, max: number) {
    return new UnitIntervalRange(
      UnitInterval.create(min),
      UnitInterval.create(max),
    );
  }

  get min() {
    return this.props.min.value;
  }

  get max() {
    return this.props.max.value;
  }
}
