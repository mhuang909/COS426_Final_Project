import { AnimatedSprite, Container } from "pixi.js";

export class AnimationController<T extends string> {
  animations: Record<T, AnimatedSprite>
  selected?: AnimatedSprite
  view: Container

  constructor(animations: Record<T, AnimatedSprite>) {
    this.view = new Container()
    this.animations = { ...animations }
  }


  setAnimation(id: T) {
    const next = this.animations[id]
    if (next === this.selected) return this
    if (this.selected) {
      this.selected.gotoAndStop(0)
      this.view.removeChild(this.selected)
    }
    this.selected = this.animations[id]
    this.view.addChild(this.selected)
    return this
  }

  play() {
    this.selected.play()
    return this
  }

  stop() {
    this.selected.stop()
    return this
  }

  setFrame(frame: number) {
    this.selected.gotoAndStop(frame)
    return this
  }

}
