import { CollisionBody } from "@components/physics/collisionbody";
import { Container } from "pixi.js";

export class Platform {
  view: Container;

  constructor(x: number, y: number, w: number, h: number, tile_type: number) {
    this.view = new Container()
    this.view.position.set(x, y)
    this.view.width = w
    this.view.height = h
    this.view.addChild(new CollisionBody(w, h, tile_type).view)
  }
}
