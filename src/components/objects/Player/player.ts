import { Controller } from "@components/controller/Controller";
import { CollisionBody } from "@components/physics/collisionbody";
import { PhysicsBody } from "@components/physics/physics";
import { AnimatedSprite, Container} from "pixi.js";


type PlayerAnimations = {
  walk: AnimatedSprite
}

export class Player {
  view: Container;
  dirView: Container;
  controller: Controller;
  animations: PlayerAnimations;
  relativeX: number;
  relativeY: number;
  physicsBody: PhysicsBody;
  collisionBody: CollisionBody;
  jumpHeight: number
  jumping: boolean
  jumpStart: number
  jumpEnd: boolean


  startingPoint: {x: number, y: number}

  constructor(c: Controller, animations: PlayerAnimations, starting: {x: number, y: number}) {
    this.view = new Container();

    this.controller = c;
    this.animations = animations;

    this.view.addChild(this.animations.walk)


    this.view.pivot.set(this.view.width / 2, this.view.height / 2)
    this.startingPoint = starting;
    this.view.x = starting.x;
    this.view.y = starting.y;

    this.collisionBody = new CollisionBody(this.view.width / 4, this.view.height / 2, 0)
    this.physicsBody = new PhysicsBody(this.view, this.collisionBody, 7, 0.2)
    this.collisionBody.view.x = this.view.width / 2 - this.collisionBody.view.width / 2
    this.collisionBody.view.y = this.view.height - this.collisionBody.view.height

    this.collisionBody.onCollision((o, sides) => {
      if (o.tile_type === 2){
        this.view.x = starting.x;
        this.view.y = starting.y;
        return;
      }
      if (sides.includes("bottom")) {
        this.jumpEnd = true
      }
    })

    this.jumping = false;
    this.jumpHeight = this.view.height / 2;
  }

  update(deltaTime: number) {
    this.relativeX = this.view.position.x / window.innerWidth;
    this.relativeY = this.view.position.y / window.innerHeight;

    if (this.controller.keys['right'].pressed) {
      this.animations.walk.play()
      this.view.scale.x = Math.abs(this.view.scale.x)
      this.physicsBody.speed.setX(2)
    } else if (this.controller.keys['left'].pressed) {
      this.view.scale.x = -Math.abs(this.view.scale.x)
      this.physicsBody.speed.setX(-2)
      this.animations.walk.play()
    } else {
      this.physicsBody.speed.setX(0)
      this.animations.walk.gotoAndStop(0)
    }



    if (this.controller.keys.space.pressed && (this.physicsBody.onGround || this.jumping)) {
      if (!this.jumping) {
        this.jumping = true
        this.jumpStart = this.view.y
      }

      if (!this.jumpEnd) {
        this.physicsBody.speed.y -= 1 * deltaTime
      }

      if (this.jumpStart - this.view.y >= this.jumpHeight) {
        this.jumpEnd = true
      }
    }

    if (!this.controller.keys.space.pressed) {
      this.jumping = false
      if (this.physicsBody.onGround) {
        this.jumpEnd = false
      }
    }
  }
}
