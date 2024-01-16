import { describe, it, expect } from 'vitest';
import { PianoChordsEnum } from '../enums/PianoChordsEnum';
import { PianoChord } from './PianoChord';

describe('PianoChord', () => {
  it('should create a PianoChord object with a valid chord', () => {
    Object.values(PianoChordsEnum).forEach(chordValue => {
      const chord = PianoChord.create(chordValue);
      expect(chord.value).toBe(chordValue);
    });
  });
});
