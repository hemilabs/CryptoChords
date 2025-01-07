import { describe, expect, it } from 'vitest';
import { TransactionColor } from './TransactionColor';
import { TransactionColorEnum } from '../enum/TransactionColorEnum';

describe('src/domain/valueObjects/CubeColor', () => {
  it('should be defined', () => {
    expect(TransactionColor).toBeDefined();
  });

  describe('create', () => {
    describe('when a valid color is provided as parameter', () => {
      it('should set the valid color in the value props', () => {
        const color = TransactionColor.create(TransactionColorEnum.Orange);
        expect(color.value).toBe('orange');
      });
    });
  });

  describe('random', () => {
    it('should return a random color', () => {
      const color = TransactionColor.random();
      expect(color.value).toBeDefined();
    });
  });
});
