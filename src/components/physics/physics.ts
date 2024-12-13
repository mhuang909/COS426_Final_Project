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

  constructor(v: Container, collision: CollisionBody, m: number, g?: number) {
    PhysicsEngineInst.bodies.push(this)

    this.view = v;
    this.collision = collision;
    this.view.addChild(collision.view)
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

      if (s.includes("top")) {
        this.force.setY(Math.min(this.force.y, 0))
        this.speed.setY(Math.min(this.speed.y, 0))
        this.onGround = true
      }

      if (s.includes("bottom")) {
        this.force.setY(Math.max(this.force.y, 0))
        this.speed.setY(Math.max(this.speed.y, 0))
      }

      if (s.includes("right") && !s.includes("top")) {
        this.force.setX(Math.max(this.force.x, 0))
        this.speed.setX(Math.max(this.speed.x, 0))
      }
      if (s.includes("left") && !s.includes("top")) {
        this.force.setX(Math.min(this.force.x, 0))
        this.speed.setX(Math.min(this.speed.x, 0))
      }

    })
  }

  precollide(deltaTime: number) {
    this.onGround = false;
  }

  update(deltaTime: number) {


    this.speed.add(this.force.multiplyScalar(deltaTime / this.mass))
    this.view.x += this.speed.x * deltaTime
    this.view.y += this.speed.y * deltaTime

    this.force.set(0, 0)

    // Gravity
    this.force.y += this.gravity * this.mass

    // Air
    this.force.y -= 0.2 * this.speed.y * this.speed.y * (this.speed.y < 0 ? -1 : 1)

  }
}

class PhysicsEngine {
  bodies: PhysicsBody[]
  colliders: CollisionBody[]

  constructor() {
    this.bodies = []
    this.colliders = []
  }

  update(deltaTime: number) {
    this.bodies.forEach(b => b.precollide(deltaTime))

    this.colliders.forEach((b) => {
      this.colliders.forEach((other) => {
        if (other !== b) {
          const sides = b.isColliding(other)
          if (sides.length > 0) {
            b.collisionCallback(other, sides)
          }
        }
      })
    })


    this.bodies.forEach((body) => {
      body.update(deltaTime)
    })
  }


}

export const PhysicsEngineInst = new PhysicsEngine()

