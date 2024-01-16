import { describe, it, expect } from 'vitest';
import { PianoTypesEnum } from './PianoTypesEnum';

describe('PianoTypesEnum', () => {
  it('should have a GrandPiano type with value "grandPiano"', () => {
    expect(PianoTypesEnum.GrandPiano).toBe('grandPiano');
  });

  it('should have an Electric type with value "electric"', () => {
    expect(PianoTypesEnum.Electric).toBe('electric');
  });

  it('should have an Organ type with value "organ"', () => {
    expect(PianoTypesEnum.Organ).toBe('organ');
  });
});
