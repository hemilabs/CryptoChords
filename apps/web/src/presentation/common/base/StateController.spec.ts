import { beforeEach, describe, expect, it, vi } from 'vitest'
import { StateController } from './StateController'

type State = {
  count: number
}

const initalState: State = {
  count: 0,
}

class SimpleStateController extends StateController<State> {
  public increment(): void {
    this.changeState({ count: this.state.count + 1 })
  }
}

describe('src/presentation/common/base/StateController', () => {
  let stateController: SimpleStateController

  beforeEach(() => {
    stateController = new SimpleStateController(initalState)
  })

  it('should initialize with initial state', () => {
    expect(stateController.state).toEqual(initalState)
  })

  it('should update state correctly', () => {
    stateController.increment()
    expect(stateController.state).toEqual({ count: 1 })
  })

  describe('subscribe', () => {
    it('should notify subscribers when state changes', () => {
      const subscriber1 = vi.fn()
      const subscriber2 = vi.fn()

      stateController.subscribe(subscriber1)
      stateController.subscribe(subscriber2)

      stateController.increment()

      expect(subscriber1).toHaveBeenCalledWith({ count: 1 })
      expect(subscriber2).toHaveBeenCalledWith({ count: 1 })
    })

    it('should send current status to subscriber when sendCurrentStatus is true', () => {
      const subscriber = vi.fn()

      stateController.subscribe(subscriber, true)

      expect(subscriber).toHaveBeenCalledWith(initalState)
    })
  })

  describe('unsubscribe', () => {

    it('should unsubscribe subscribers correctly', () => {
      const subscriber1 = vi.fn()
      const subscriber2 = vi.fn()

      stateController.subscribe(subscriber1)
      stateController.subscribe(subscriber2)

      stateController.increment()

      stateController.unsubscribe(subscriber1)

      stateController.increment()

      expect(subscriber1).toHaveBeenCalledTimes(1)
      expect(subscriber2).toHaveBeenCalledTimes(2)
    })

    it('should not throw an error or affect the listeners if unsubscribe an unsubscribed listener', () => {
      const subscriber1 = vi.fn()
      const subscriber2 = vi.fn()

      stateController.subscribe(subscriber1)
      stateController.unsubscribe(subscriber2)

      stateController.increment()
      expect(subscriber1).toHaveBeenCalledTimes(1)
    })
  })
})
