import { Vector2 } from "three"
import { CollisionBody } from "./collisionbody"

export type Position = {
  x: number,
  y: number,
}

export type Transform = Position & {
  rotation: number
}

export class PhysicsBody {
  transform: Transform
  mass: number
  force: Vector2
  speed: Vector2
  gravity: number

  constructor(t: Transform, m: number, g?: number) {
    PhysicsEngineInst.bodies.push(this)

    this.transform = t;
    this.mass = m
    this.force = new Vector2()
    this.speed = new Vector2()
    this.gravity = g ?? 9.8
  }

  update(deltaTime: number) {
    //this.force.add(new Vector2(0, 1 * this.gravity * this.mass))

    this.speed.add(this.force.divideScalar(this.mass))
    this.transform.x += this.speed.x * deltaTime
    this.transform.y += this.speed.y * deltaTime

    this.speed.set(0, 0)
    this.force.set(0, 0)
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
    this.colliders.forEach((b) => {
      this.colliders.forEach((other) => {
        if (other !== b) {
          if (b.isColliding(other)) {
            b.collisionCallback(other)
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

