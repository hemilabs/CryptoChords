import { describe, it, expect } from 'vitest';
import { PianoTypesEnum } from '../enums/PianoTypesEnum';
import { PianoTypes } from './PianoTypes';

describe('PianoTypes', () => {
  it('should create a PianoTypes object with a valid piano type', () => {
    Object.values(PianoTypesEnum).forEach(pianoTypeValue => {
      const pianoType = PianoTypes.create(pianoTypeValue);
      expect(pianoType.value).toBe(pianoTypeValue);
    });
  });
});
