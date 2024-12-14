import { Vector2 } from "three"
import { CollisionBody } from "./collisionbody"
import { Container } from "pixi.js"


export class PhysicsBody {
  view: Container
  mass: number
  force: Vector2
  speed: Vector2
  gravity: number
  collision: CollisionBody
  onGround: boolean

  constructor(engine: PhysicsEngine, v: Container, collision: CollisionBody, m: number, g?: number) {
    engine.bodies.push(this)

    this.view = v;
    this.collision = collision;
    this.mass = m
    this.force = new Vector2()
    this.speed = new Vector2()
    this.gravity = g ?? 9.8
    this.onGround = false

    this.registerCollisionBody();
  }

  registerCollisionBody() {
    this.collision.onCollision((o, s) => {
      if (o.trigger) return;
      const pcTopBottom = ((this.collision.maxX() > o.maxX() ? o.maxX() : this.collision.maxX()) - (this.collision.minX() < o.minX() ? o.minX() : this.collision.minX())) / (this.collision.maxX() - this.collision.minX())
      const pcLeftRight = ((this.collision.maxY() > o.maxY() ? o.maxY() : this.collision.maxY()) - (this.collision.minY() < o.minY() ? o.minY() : this.collision.minY())) / (this.collision.maxY() - this.collision.minY())


      if (s.includes("top")) {
        this.force.setY(Math.min(this.force.y, 0))
        this.speed.setY(Math.min(this.speed.y, 0))
        this.onGround = true
        if (this.collision.maxY() > o.minY() && pcTopBottom > 0.8) {
          this.view.y -= pcLeftRight * this.collision.view.height
        }
      }

      if (s.includes("bottom")) {
        this.force.setY(Math.max(this.force.y, 0))
        this.speed.setY(Math.max(this.speed.y, 0))
        if (this.collision.minY() < o.maxY() && pcTopBottom > 0.8) {
          this.view.y += pcLeftRight * this.collision.view.height
        }
      }

      if (s.includes("right")) {
        if (this.collision.minX() < o.maxX() && pcLeftRight > 0.2) {
          this.view.x += pcTopBottom * this.collision.view.width
        }
      }
      if (s.includes("left")) {
        this.force.setX(Math.min(this.force.x, 0))
        this.speed.setX(Math.min(this.speed.x, 0))
        if (this.collision.maxX() > o.minX() && pcLeftRight > 0.3) {
          this.view.x -= pcTopBottom * this.collision.view.width
        }
      }

    })
  }

  update(deltaTime: number) {
    this.onGround = false

    this.speed.add(this.force.multiplyScalar(deltaTime / this.mass))
    this.view.x += Math.max(-7, Math.min(7, this.speed.x * deltaTime))
    this.view.y += Math.max(-7, Math.min(7, this.speed.y * deltaTime))

    this.force.set(0, 0)

    // Gravity
    this.force.y += this.gravity * this.mass

    // Air
    this.force.y -= 0.2 * this.speed.y * this.speed.y * (this.speed.y < 0 ? -1 : 1)
  }
}

export class PhysicsEngine {
  bodies: PhysicsBody[]
  colliders: CollisionBody[]

  constructor() {
    this.bodies = []
    this.colliders = []
  }

  update(deltaTime: number) {

    this.bodies.forEach((body) => {
      body.update(deltaTime)
    })

    this.colliders.forEach((a, i) => {
      for (let t = i + 1; t < this.colliders.length; t++) {
        const b = this.colliders[t]
        const sidesA = a.isColliding(b)
        const sidesB = b.isColliding(a)
        if (sidesA.length > 0) a.collisionCallback(b, sidesA)
        if (sidesB.length > 0) b.collisionCallback(a, sidesB)
      }
    })
  }
}

