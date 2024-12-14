import { Container } from "pixi.js";
import { Rectangle } from "@components/debug/Rectangle";
import { PhysicsEngine } from "./physics";

type side = 'top' | 'bottom' | 'left' | 'right' | 'none'

export type collisonCallbackFn = (other: CollisionBody, s: side[]) => void;

export class CollisionBody {

  view: Container
  tile_type: number
  /* 0: player
  1: platform
  2: spike
  */

  callbacks: collisonCallbackFn[]
  trigger: boolean

  constructor(engine: PhysicsEngine, w: number, h: number, tile_type: number, trigger?: boolean) {

    this.view = new Container()
    this.tile_type = tile_type;
    this.view.addChild(new Rectangle(0, 0, w, h, "#00FF00"))
    this.trigger = trigger ?? false;
    this.callbacks = [];
    engine.colliders.push(this)
  }

  isColliding(other: CollisionBody): side[] {
    if (this.maxX() <= other.minX() || this.minX() >= other.maxX() ||
      this.maxY() <= other.minY() || this.minY() >= other.maxY()) return []

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

