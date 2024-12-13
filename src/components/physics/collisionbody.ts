import { Container } from "pixi.js";
import { PhysicsEngineInst, Position } from "./physics";
import { Rectangle } from "@components/debug/Rectangle";

type GlobalTransform = {

  getGlobalPosition: () => Position
}

export class CollisionBody {

  view: Container

  callbacks: ((other: CollisionBody) => void)[]

  constructor(w: number, h: number) {
    PhysicsEngineInst.colliders.push(this)

    this.view = new Container()
    this.view.width = w
    this.view.height = h
    this.view.addChild(new Rectangle(0, 0, w, h, "#00FF00"))
    this.callbacks = [];
  }

  isColliding(other: CollisionBody): boolean {
    return !(this.maxX() <= other.minX() || this.minX() >= other.maxX() ||
      this.maxY() <= other.minY() || this.minY() >= other.maxY())
  }

  minX() { return this.view.getBounds().minX }
  maxX() { return this.view.getBounds().maxX }
  minY() { return this.view.getBounds().minY }
  maxY() { return this.view.getBounds().maxY }

  collisionCallback(other: CollisionBody) {
    this.callbacks.forEach(fn => fn(other))
  }

  onCollision(fn: (other: CollisionBody) => void): void {
    console.log(fn)
    this.callbacks.push(fn)
  }
}
