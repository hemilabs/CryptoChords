import { Keyboard } from '../valueObjects/Keyboard'

export interface KeyboardRepository {
  setKeyboard: (keyboard: Keyboard) => void
  getKeyboard: () => Keyboard | undefined
}