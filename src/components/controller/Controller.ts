// Adapted from https://pixijs.com/8.x/tutorials/spine-boy-adventure#6

const keyMap: Record<string, control> = {
  Space: 'space',
  KeyW: 'up',
  ArrowUp: 'up',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyD: 'right',
  ArrowRight: 'right',
  KeyN: 'next'
}

type control = 'space' | 'up' | 'down' | 'left' | 'right' | 'next'

type key = {
  pressed: boolean,
  doubleTap: boolean,
  timestamp: number,
}
type KeyCallback = (k: control, state: key) => void

export class Controller {
  keys: Record<control, key>
  delay: number
  keyUpCallbacks: KeyCallback[]
  keyDownCallbacks: KeyCallback[]

  constructor(dblTapDelayMs?: number) {
    if (!dblTapDelayMs) this.delay = 300;

    this.keys = {
      space: { pressed: false, doubleTap: false, timestamp: 0 },
      up: { pressed: false, doubleTap: false, timestamp: 0 },
      down: { pressed: false, doubleTap: false, timestamp: 0 },
      left: { pressed: false, doubleTap: false, timestamp: 0 },
      right: { pressed: false, doubleTap: false, timestamp: 0 },
      next: { pressed: false, doubleTap: false, timestamp: 0 },
    }

    this.keyUpCallbacks = []
    this.keyDownCallbacks = []

    window.addEventListener('keydown', (ev) => this.keydownHandler(ev))
    window.addEventListener('keyup', (ev) => this.keyupHandler(ev))
  }

  attachKeyUpCallback(fn: KeyCallback) {
    this.keyUpCallbacks.push(fn)
  }

  attachKeyDownCallback(fn: KeyCallback) {
    this.keyDownCallbacks.push(fn)
  }

  keydownHandler(ev: KeyboardEvent) {
    const key = keyMap[ev.code]
    if (!key) return;

    const now = Date.now();
    this.keys[key].doubleTap = this.keys[key].doubleTap || now - this.keys[key].timestamp < this.delay;

    this.keys[key].pressed = true;

    this.keyDownCallbacks.forEach(fn => fn(key, this.keys[key]))

  }

  keyupHandler(ev: KeyboardEvent) {
    const key = keyMap[ev.code]
    if (!key) return;

    const now = Date.now();
    this.keys[key].pressed = false;

    if (this.keys[key].doubleTap) this.keys[key].doubleTap = false;
    else this.keys[key].timestamp = now;

    this.keyUpCallbacks.forEach(fn => fn(key, this.keys[key]))
  }
}

export const controller = new Controller(100);
