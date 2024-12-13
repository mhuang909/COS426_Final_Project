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
      const pcTopBottom = ((this.collision.maxX() > o.maxX() ? o.maxX() : this.collision.maxX()) - (this.collision.minX() < o.minX() ? o.minX() : this.collision.minX())) / (this.collision.maxX() - this.collision.minX())
      const pcLeftRight = ((this.collision.maxY() > o.maxY() ? o.maxY() : this.collision.maxY()) - (this.collision.minY() < o.minY() ? o.minY() : this.collision.minY())) / (this.collision.maxY() - this.collision.minY())


      if (s.includes("top")) {
        console.log("top")
        this.force.setY(Math.min(this.force.y, 0))
        this.speed.setY(Math.min(this.speed.y, 0))
        this.onGround = true
        if (this.collision.maxY() > o.minY() && pcTopBottom > 0.8) {
          console.log("Top")
          this.view.y -= pcLeftRight * this.collision.view.height
        }
      }

      if (s.includes("bottom")) {
        console.log("bottom")
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
        console.log(this.collision.maxX() - o.minX())
        if (this.collision.maxX() > o.minX() && pcLeftRight > 0.3) {
          this.view.x -= pcTopBottom * this.collision.view.width
        }
      }

    })
  }

  precollide(deltaTime: number) {
    this.onGround = false;
  }

  update(deltaTime: number) {

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

class PhysicsEngine {
  bodies: PhysicsBody[]
  colliders: CollisionBody[]

  constructor() {
    this.bodies = []
    this.colliders = []
  }

  update(deltaTime: number) {
    this.bodies.forEach(b => b.precollide(deltaTime))


    this.bodies.forEach((body) => {
      body.update(deltaTime)
    })

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
  }


}

export const PhysicsEngineInst = new PhysicsEngine()

