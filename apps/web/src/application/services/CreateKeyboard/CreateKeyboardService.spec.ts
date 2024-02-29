import { beforeAll, describe, expect, it, vi } from 'vitest'
import { CreateKeyboardService } from './CreateKeyboardService'
import { KeyboardRepository } from '../../../domain/repositories/KeyboardRepository'

describe('src/application/CreateKeyboard/CreateKeyboardService', () => {
  let createKeyboardService: CreateKeyboardService
  let keyboardRepository: KeyboardRepository

  beforeAll(() => {
    keyboardRepository= {
      setKeyboard: vi.fn(),
      getKeyboard: vi.fn()
    }
    createKeyboardService = new CreateKeyboardService(keyboardRepository)
  })

  it('should be defined', () => {
    expect(createKeyboardService).toBeDefined()
  })

  it('should return a keyboard with 88 keys', async () => {
    const response = await createKeyboardService.execute({
      initialOctave: 0,
      numberOfKeys: 88,
      initialPitchClass: 'A'
    })
    expect(response.keys.length).toBe(88)
  })

  it('should call setKeyboard', async () => {
    await createKeyboardService.execute({
      initialOctave: 0,
      numberOfKeys: 88,
      initialPitchClass: 'A'
    })
    expect(keyboardRepository.setKeyboard).toHaveBeenCalled()
  })
})