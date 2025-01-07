import { describe, expect, it } from 'vitest';
import { UnitIntervalRange } from './UnitIntervalRange';

describe('src/domain/valueObjects/UnitIntervalRange', () => {
  it('should be defined', () => {
    expect(UnitIntervalRange).toBeDefined();
  });

  describe('create', () => {
    it('should return a UnitIntervalRange', () => {
      const unitIntervalRange = UnitIntervalRange.create(0, 1);
      expect(unitIntervalRange).toBeInstanceOf(UnitIntervalRange);
    });
  });
});
