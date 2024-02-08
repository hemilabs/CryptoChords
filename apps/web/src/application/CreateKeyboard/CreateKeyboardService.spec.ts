import { beforeAll, describe, expect, it } from 'vitest'
import { CreateKeyboardService } from './CreateKeyboardService'

describe('src/application/CreateKeyboard/CreateKeyboardService', () => {
  let createKeyboardService: CreateKeyboardService

  beforeAll(() => {
    createKeyboardService = new CreateKeyboardService()
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
})