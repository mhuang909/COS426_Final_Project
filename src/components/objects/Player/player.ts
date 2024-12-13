import { Controller } from "@components/controller/Controller";
import { Rectangle } from "@components/debug/Rectangle";
import { CollisionBody } from "@components/physics/collisionbody";
import { PhysicsBody } from "@components/physics/physics";
import { AnimatedSprite, Container } from "pixi.js";

type PlayerAnimations = {
  walk: AnimatedSprite
}

export class Player {
  view: Container;
  dirView: Container;
  controller: Controller;
  animations: PlayerAnimations;
  debug: Rectangle;
  relativeX: number;
  relativeY: number;
  physicsBody: PhysicsBody;
  collisionBody: CollisionBody;

  constructor(c: Controller, animations: PlayerAnimations) {
    this.view = new Container();

    this.controller = c;
    this.animations = animations;

    this.view.x = window.innerWidth / 2
    this.view.y = window.innerHeight / 2

    this.relativeX = this.view.position.x / window.innerWidth;
    this.relativeY = this.view.position.y / window.innerHeight;

    this.view.addChild(this.animations.walk)

    this.debug = new Rectangle(0, 0, this.view.width, this.view.height)
    this.view.addChild(this.debug)

    this.view.pivot.set(this.view.width / 2, this.view.height / 2)

    this.physicsBody = new PhysicsBody(this.view, 50)
    this.collisionBody = new CollisionBody(this.view.width / 4, this.view.height / 2)
    this.view.addChild(this.collisionBody.view)
    this.collisionBody.view.x = this.view.width / 2 - this.collisionBody.view.width / 2
    this.collisionBody.view.y = this.view.height - this.collisionBody.view.height
    this.collisionBody.onCollision((o) => {
      console.log("Colliding")
    })
  }

  update(deltaTime: number) {
    this.relativeX = this.view.position.x / window.innerWidth;
    this.relativeY = this.view.position.y / window.innerHeight;

    if (this.controller.keys['right'].pressed) {
      this.animations.walk.play()
      this.view.scale.x = 1
      this.view.position.x += 2 * deltaTime
    } else if (this.controller.keys['left'].pressed) {
      this.view.scale.x = -1
      this.view.position.x -= 2 * deltaTime
      this.animations.walk.play()
    } else {
      this.animations.walk.gotoAndStop(0)
    }
  }
}
