import { Rectangle } from "@components/debug/Rectangle";
import { CollisionBody } from "@components/physics/collisionbody";
import { Container } from "pixi.js";

export class Platform {
  view: Container;

  constructor(x: number, y: number, w: number, h: number) {
    this.view = new Container()
    this.view.position.set(x, y)
    this.view.width = w
    this.view.height = h
    this.view.addChild(new Rectangle(0, 0, this.view.width, this.view.height))
    this.view.addChild(new CollisionBody(w, h).view)
  }
}
