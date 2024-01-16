import { describe, expect, it } from 'vitest'
import { Entity } from '../base/Entity'
import { PianoSound } from './PianoSound'
import { TxType } from '../valueObjects/Txtype'
import { TxTypesEnum } from '../enums/TxTypesEnum'
import { Address } from '../valueObjects/Address'
import { PianoChord } from '../valueObjects/PianoChord'
import { PianoChordsEnum } from '../enums/PianoChordsEnum'

describe('src/domain/entities/PianoSound', () => {
  const txType = TxType.create(TxTypesEnum.Eth) 
  const address = Address.create("0xbhbfhudhuf")
  const pianoChord = PianoChord.create(PianoChordsEnum.CMajor)

  it('should be defined', () => {
    expect(PianoSound).toBeDefined()
  })

  it('should be an instance of Entity', () => {
    const pianoSound = PianoSound.create({
      txType,
      address,
      pianoChord
    })

    expect(pianoSound).toBeInstanceOf(Entity)
  })

  describe('create', () => {
    const pianoSound = PianoSound.create({
      txType,
      address,
      pianoChord
    })

    it('should set the txType on tagname txType', () => {
      expect(pianoSound.txType).toBe(txType.value)
    })

    it('should set the address on address property', () => {
      expect(pianoSound.address).toBe(address.value)
    })

    it('should set the pianoChord on pianoChord property', () => {
      expect(pianoSound.pianoChord).toBe(pianoChord.value)
    })
  })
})
