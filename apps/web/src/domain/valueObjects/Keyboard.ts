import { ValueObject } from '../base/ValueObject'
import { Key } from './Key'

export interface KeyboardProps {
  keys: Key[]  
}

export class Keyboard extends ValueObject<KeyboardProps> {
  private constructor(props: KeyboardProps) {
    super(props)
  }

  static create(props: KeyboardProps) {
    return new Keyboard(props)
  }

  get keys() {
    return this.props.keys
  }
}
