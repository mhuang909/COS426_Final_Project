import { Container } from "pixi.js";
import { PhysicsEngineInst } from "./physics";
import { Rectangle } from "@components/debug/Rectangle";

type side = 'top' | 'bottom' | 'left' | 'right' | 'none'

export class CollisionBody {

  view: Container

  callbacks: ((other: CollisionBody, s: side[]) => void)[]
  trigger: boolean

  constructor(w: number, h: number, trigger?: boolean) {
    PhysicsEngineInst.colliders.push(this)

    this.view = new Container()
    this.view.width = w
    this.view.height = h
    this.view.addChild(new Rectangle(0, 0, w, h, "#00FF00"))
    this.trigger = trigger ?? false;
    this.callbacks = [];
  }

  isColliding(other: CollisionBody): side[] {
    if (this.maxX() <= other.minX() || this.minX() >= other.maxX() ||
      this.maxY() <= other.minY() || this.minY() >= other.maxY()) return []

    const sides = []
    if (Math.abs(this.maxX() - other.minX()) < 10) sides.push("left")
    if (Math.abs(this.minX() - other.maxX()) < 10) sides.push("right")
    if (Math.abs(this.maxY() - other.minY()) < 10) sides.push("top")
    if (Math.abs(this.minY() - other.maxY()) < 10) sides.push("bottom")
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

