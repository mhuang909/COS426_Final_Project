import { Controller } from "@components/controller/Controller";
import { AnimatedSprite, Container, ObservablePoint, Ticker } from "pixi.js";

type PlayerAnimations = {
  walk: AnimatedSprite
}

export class Player {
  view: Container;
  dirView: Container;
  controller: Controller;
  animations: PlayerAnimations;

  constructor(c: Controller, animations: PlayerAnimations) {
    this.view = new Container();

    this.controller = c;
    this.animations = animations;

    this.view.addChild(this.animations.walk)
    this.view.x = window.innerWidth / 2
    this.animations.walk.anchor.set(0.5, 0)
  }

  update(deltaTime: number) {
    if (this.controller.keys['right'].pressed) {
      this.animations.walk.play()
      this.view.scale.x = 1
      this.view.position.x += 2 * deltaTime
    } else if (this.controller.keys['left'].pressed) {
      this.view.scale.x = -1
      this.view.position.x -= 2 * deltaTime
      this.animations.walk.play()
    } else {
      this.animations.walk.gotoAndStop(0)
    }
  }


}
