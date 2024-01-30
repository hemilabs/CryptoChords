import { describe, expect, it } from 'vitest'
import { CubeColor } from './CubeColor'
import { CubeColorEnum } from '../enum/CubeColorEnum'

describe('src/domain/valueObjects/CubeColor', () => {
  it('should be defined', () => {
    expect(CubeColor).toBeDefined()
  })

  describe('create', () => {
    describe('when a valid color is provided as parameter', () => {
      it('should set the valid color in the value props', () => {
        const color = CubeColor.create(CubeColorEnum.Orange)
        expect(color.value).toBe('orange')
      })
    })
  })

  describe('random', () => {
    it('should return a random color', () => {
      const color = CubeColor.random()
      expect(color.value).toBeDefined()
    })
  })

})