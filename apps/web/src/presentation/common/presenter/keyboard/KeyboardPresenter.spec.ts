import { describe, expect, it } from 'vitest';
import { KeyboardPresenter } from './KeyboardPresenter';
import { InMemoryKeyboardRepository } from '../../../../infrastructure/repositories/InMemoryKeyboardRepository';
import { CreateKeyboardService } from '../../../../application/services/CreateKeyboard/CreateKeyboardService';
import { GetKeyboardService } from '../../../../application/services/GetKeyboard/GetKeyboardService';

const keyboardRepository = new InMemoryKeyboardRepository();
const createKeyboardService = new CreateKeyboardService(keyboardRepository);
await createKeyboardService.execute({
  initialOctave: 1,
  initialPitchClass: 'A',
  numberOfKeys: 88,
});
const getKeyboardService = new GetKeyboardService(keyboardRepository);
const keyboardPresenter = new KeyboardPresenter(
  createKeyboardService,
  getKeyboardService,
);

describe('src/presentation/common/presenter/keyboard/KeyboardPresenter', () => {
  it('should be defined', () => {
    expect(keyboardPresenter).toBeDefined();
  });

  it('should have 88 keys', () => {
    expect(keyboardPresenter.state.keys.length).toBe(88);
  });
});
