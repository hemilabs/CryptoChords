import { beforeAll, describe, expect, it, vi } from 'vitest';
import { CreateKeyboardService } from './CreateKeyboardService';
import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository';

describe('src/application/CreateKeyboard/CreateKeyboardService', () => {
  let createKeyboardService: CreateKeyboardService;
  let keyboardRepository: KeyboardRepository;

  beforeAll(() => {
    keyboardRepository = {
      getKeyboard: vi.fn(),
      setKeyboard: vi.fn(),
    };
    createKeyboardService = new CreateKeyboardService(keyboardRepository);
  });

  it('should be defined', () => {
    expect(createKeyboardService).toBeDefined();
  });

  it('should return a keyboard with 88 keys', async () => {
    const response = await createKeyboardService.execute({
      initialOctave: 0,
      initialPitchClass: 'A',
      numberOfKeys: 88,
    });
    expect(response.keys.length).toBe(88);
  });

  it('should call setKeyboard', async () => {
    await createKeyboardService.execute({
      initialOctave: 0,
      initialPitchClass: 'A',
      numberOfKeys: 88,
    });
    expect(keyboardRepository.setKeyboard).toHaveBeenCalled();
  });
});
