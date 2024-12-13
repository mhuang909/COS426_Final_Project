import { Container } from "pixi.js";
import { PhysicsEngineInst } from "./physics";
import { Rectangle } from "@components/debug/Rectangle";

type side = 'top' | 'bottom' | 'left' | 'right' | 'none'

export class CollisionBody {

  view: Container
  tile_type: number
  /* 0: player
  1: platform
  2: spike
  */

  callbacks: ((other: CollisionBody, s: side[]) => void)[]
  trigger: boolean

  constructor(w: number, h: number, tile_type: number, trigger?: boolean) {
    PhysicsEngineInst.colliders.push(this)

    this.view = new Container()
    this.view.width = w
    this.view.height = h
    this.tile_type = tile_type;
    this.view.addChild(new Rectangle(0, 0, w, h, "#00FF00"))
    this.trigger = trigger ?? false;
    this.callbacks = [];
  }

  isColliding(other: CollisionBody): side[] {
    if (this.maxX() + 4 <= other.minX() || this.minX() - 4 >= other.maxX() ||
      this.maxY() + 16 <= other.minY() || this.minY() - 16 >= other.maxY()) return []

    const pcTopBottom = ((this.maxX() > other.maxX() ? other.maxX() : this.maxX()) - (this.minX() < other.minX() ? other.minX() : this.minX())) / (this.maxX() - this.minX())
    const pcLeftRight = ((this.maxY() > other.maxY() ? other.maxY() : this.maxY()) - (this.minY() < other.minY() ? other.minY() : this.minY())) / (this.maxY() - this.minY())


    const sides = []
    if (this.maxX() > other.minX() && this.minX() < other.minX()) sides.push("left")
    if (this.minX() < other.maxX() && this.maxX() > other.maxX()) sides.push("right")
    if (this.maxY() > other.minY() && this.minY() < other.minY() && pcTopBottom > 0.3) sides.push("top")
    if (this.minY() < other.maxY() && this.maxY() > other.maxY() && pcTopBottom > 0.3) sides.push("bottom")
    return sides;
  }

  minX() { return this.view.getBounds().minX }
  maxX() { return this.view.getBounds().maxX }
  minY() { return this.view.getBounds().minY }
  maxY() { return this.view.getBounds().maxY }

  collisionCallback(other: CollisionBody, s: side[]) {
    this.callbacks.forEach(fn => fn(other, s))
  }

  onCollision(fn: (other: CollisionBody, s: side[]) => void): void {
    this.callbacks.push(fn)
  }
}

