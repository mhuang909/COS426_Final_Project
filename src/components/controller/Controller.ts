// Adapted from https://pixijs.com/8.x/tutorials/spine-boy-adventure#6

const keyMap = {
  Space: 'space',
  KeyW: 'up',
  ArrowUp: 'up',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyD: 'right',
  ArrowRight: 'right',
}

type key = {
  pressed: boolean,
  doubleTap: boolean,
  timestamp: number,
}

export class Controller {
  keys: Record<string, key>
  delay: number

  constructor(dblTapDelayMs?: number) {
    if (!dblTapDelayMs) this.delay = 300;

    this.keys = {
      space: { pressed: false, doubleTap: false, timestamp: 0 },
      up: { pressed: false, doubleTap: false, timestamp: 0 },
      down: { pressed: false, doubleTap: false, timestamp: 0 },
      left: { pressed: false, doubleTap: false, timestamp: 0 },
      right: { pressed: false, doubleTap: false, timestamp: 0 },
    }

    window.addEventListener('keydown', (ev) => this.keydownHandler(ev))
    window.addEventListener('keyup', (ev) => this.keyupHandler(ev))
  }

  keydownHandler(ev: KeyboardEvent) {
    const key = keyMap[ev.code]
    if (!key) return;

    const now = Date.now();
    this.keys[key].doubleTap = this.keys[key].doubleTap || now - this.keys[key].timestamp < this.delay;

    this.keys[key].pressed = true;

  }

  keyupHandler(ev: KeyboardEvent) {
    const key = keyMap[ev.code]
    if (!key) return;

    const now = Date.now();

    this.keys[key].pressed = false;

    if (this.keys[key].doubleTap) this.keys[key].doubleTap = false;
    else this.keys[key].timestamp = now;
  }
}
