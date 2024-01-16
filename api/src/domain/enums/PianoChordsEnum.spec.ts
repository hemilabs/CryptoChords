import { describe, it, expect } from 'vitest';
import { PianoChordsEnum } from './PianoChordsEnum';

describe('PianoChordsEnum', () => {
  it('should have a CMajor chord with value "cmajor"', () => {
    expect(PianoChordsEnum.CMajor).toBe('cmajor');
  });

  it('should have a GMajor chord with value "gmajor"', () => {
    expect(PianoChordsEnum.GMajor).toBe('gmajor');
  });

  it('should have an AMinor chord with value "aminor"', () => {
    expect(PianoChordsEnum.AMinor).toBe('aminor');
  });

  it('should have an FMajor chord with value "fmajor"', () => {
    expect(PianoChordsEnum.FMajor).toBe('fmajor');
  });
});
