import { Keyboard } from '../../domain/valueObjects/Keyboard';

export class InMemoryKeyboardRepository {
  private keyboard: Keyboard | undefined;

  public setKeyboard(keyboard: Keyboard) {
    this.keyboard = keyboard;
  }

  public getKeyboard() {
    return this.keyboard;
  }
}
