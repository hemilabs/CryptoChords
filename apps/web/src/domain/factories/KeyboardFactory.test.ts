import { describe, expect, it } from 'vitest'
import { KeyboardFactory } from './KeyboardFactory'
import { KeyShapeEnum } from '../enum/KeyShapeEnum'
import { PitchClassEnum } from '../enum/PitchClassEnum'

describe('src/domain/factories/KeyboardFactory', () => {
  it('should be defined', () => {
    expect(KeyboardFactory).toBeDefined()
  })

  it('should return a keyboard with 88 keys', () => {
    const keyboard = KeyboardFactory.create({
      initialOctave: 0,
      numberOfKeys: 88,
      initialPitchClass: PitchClassEnum.A
    })
    expect(keyboard.keys.length).toBe(88)
  })

  it('should return a keyboard with the correct keys', () => {
    const keyboard = KeyboardFactory.create({
      initialOctave: 1,
      numberOfKeys: 12,
      initialPitchClass: PitchClassEnum.F
    })
    expect(keyboard.keys[0].pitch.class.value).toBe(PitchClassEnum.F)
    expect(keyboard.keys[0].pitch.octave).toBe(1)
    expect(keyboard.keys[0].keyShape.value).toBe(KeyShapeEnum.WhiteLeft)

    expect(keyboard.keys[1].pitch.class.value).toBe(PitchClassEnum.F_SHARP)
    expect(keyboard.keys[1].pitch.octave).toBe(1)
    expect(keyboard.keys[1].keyShape.value).toBe(KeyShapeEnum.Black)
    
    expect(keyboard.keys[2].pitch.class.value).toBe(PitchClassEnum.G)
    expect(keyboard.keys[2].pitch.octave).toBe(1)
    expect(keyboard.keys[2].keyShape.value).toBe(KeyShapeEnum.WhiteMiddle)
    
    expect(keyboard.keys[3].pitch.class.value).toBe(PitchClassEnum.G_SHARP)
    expect(keyboard.keys[3].pitch.octave).toBe(1)
    expect(keyboard.keys[3].keyShape.value).toBe(KeyShapeEnum.Black)
    
    expect(keyboard.keys[4].pitch.class.value).toBe(PitchClassEnum.A)
    expect(keyboard.keys[4].pitch.octave).toBe(1)
    expect(keyboard.keys[4].keyShape.value).toBe(KeyShapeEnum.WhiteMiddle)
    
    expect(keyboard.keys[5].pitch.class.value).toBe(PitchClassEnum.A_SHARP)
    expect(keyboard.keys[5].pitch.octave).toBe(1)
    expect(keyboard.keys[5].keyShape.value).toBe(KeyShapeEnum.Black)
    
    expect(keyboard.keys[6].pitch.class.value).toBe(PitchClassEnum.B)
    expect(keyboard.keys[6].pitch.octave).toBe(1)
    expect(keyboard.keys[6].keyShape.value).toBe(KeyShapeEnum.WhiteRight)
    
    expect(keyboard.keys[7].pitch.class.value).toBe(PitchClassEnum.C)
    expect(keyboard.keys[7].pitch.octave).toBe(2)
    expect(keyboard.keys[7].keyShape.value).toBe(KeyShapeEnum.WhiteLeft)
    
    expect(keyboard.keys[8].pitch.class.value).toBe(PitchClassEnum.C_SHARP)
    expect(keyboard.keys[8].pitch.octave).toBe(2)
    expect(keyboard.keys[8].keyShape.value).toBe(KeyShapeEnum.Black)
    
    expect(keyboard.keys[9].pitch.class.value).toBe(PitchClassEnum.D)
    expect(keyboard.keys[9].pitch.octave).toBe(2)
    expect(keyboard.keys[9].keyShape.value).toBe(KeyShapeEnum.WhiteMiddle)
    
    expect(keyboard.keys[10].pitch.class.value).toBe(PitchClassEnum.D_SHARP)
    expect(keyboard.keys[10].pitch.octave).toBe(2)
    expect(keyboard.keys[10].keyShape.value).toBe(KeyShapeEnum.Black)
    
    expect(keyboard.keys[11].pitch.class.value).toBe(PitchClassEnum.E)
    expect(keyboard.keys[11].pitch.octave).toBe(2)
    expect(keyboard.keys[11].keyShape.value).toBe(KeyShapeEnum.WhiteRight)
  })

  it('should return a keyboard with a full white last key when it finish with a C key', () => {
    const keyboard = KeyboardFactory.create({
      initialOctave: 1,
      numberOfKeys: 2,
      initialPitchClass: PitchClassEnum.B
    })
    expect(keyboard.keys[1].keyShape.value).toBe(KeyShapeEnum.White)
  })

  it('should return a keyboard with a full white last key when it finish with a F key', () => {
    const keyboard = KeyboardFactory.create({
      initialOctave: 1,
      numberOfKeys: 2,
      initialPitchClass: PitchClassEnum.E
    })
    expect(keyboard.keys[1].keyShape.value).toBe(KeyShapeEnum.White)
  })

  it('should return a keyboard with a white-right last key when it finish with a D key', () => {
    const keyboard = KeyboardFactory.create({
      initialOctave: 1,
      numberOfKeys: 3,
      initialPitchClass: PitchClassEnum.C
    })
    expect(keyboard.keys[2].keyShape.value).toBe(KeyShapeEnum.WhiteRight)
  })
  
  it('should return a keyboard with a white-right last key when it finish with a G key', () => {
    const keyboard = KeyboardFactory.create({
      initialOctave: 1,
      numberOfKeys: 3,
      initialPitchClass: PitchClassEnum.F
    })
    expect(keyboard.keys[2].keyShape.value).toBe(KeyShapeEnum.WhiteRight)
  })

  it('should return a keyboard with a white-right last key when it finish with a A key', () => {
    const keyboard = KeyboardFactory.create({
      initialOctave: 1,
      numberOfKeys: 3,
      initialPitchClass: PitchClassEnum.G
    })
    expect(keyboard.keys[2].keyShape.value).toBe(KeyShapeEnum.WhiteRight)
  })
})
