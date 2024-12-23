import { AnimationController } from "@components/animations/AnimationController";
import { controller, Controller } from "@components/controller/Controller";
import { Rectangle } from "@components/debug/Rectangle";
import { CollisionBody } from "@components/physics/collisionbody";
import { PhysicsBody, PhysicsEngine } from "@components/physics/physics";
import { AnimatedSprite, Container, Spritesheet, Texture } from "pixi.js";
import { atlasData } from "../../../assets/atlas";
import jump from '../../../assets/audio/jump_01.mp3';

type PlayerAnimationIds = "walk" | "jump" | "sword"



export type PlayerAnimations = Record<PlayerAnimationIds, AnimatedSprite>

export class Player {
  view: Container;
  playerView: Container
  swordView: Container

  controller: Controller;

  physicsBody: PhysicsBody;
  collisionBody: CollisionBody;

  jumpHeight: number
  jumping: boolean
  jumpStart: number
  jumpEnd: boolean
  jumpLanded: boolean

  playerAnimations: AnimationController<Exclude<PlayerAnimationIds, "sword">>
  swordAnimations: AnimationController<"sword">

  swordCollider: CollisionBody
  swordCooldown: number
  swordCooldownMax: number
  slash: boolean
  lastDeath: number


  constructor(c: Controller, animations: PlayerAnimations, engine: PhysicsEngine) {
    this.view = new Container();
    this.playerView = new Container()
    this.swordView = new Container()

    this.view.addChild(this.playerView)
    this.view.addChild(this.swordView)

    this.controller = c;

    // Setup Player View
    this.playerAnimations = new AnimationController(animations)
    this.playerAnimations.setAnimation("walk")
    this.playerView.addChild(this.playerAnimations.view)

    this.collisionBody = new CollisionBody(engine, 0, 0, this.playerView.width / 4, this.playerView.height / 2, 'player')
    this.playerView.addChild(this.collisionBody.view)
    this.physicsBody = new PhysicsBody(engine, this.view, this.collisionBody, 7, 0.2)

    this.collisionBody.view.x = this.playerView.width / 2 - this.collisionBody.view.width / 2
    this.collisionBody.view.y = this.playerView.height - this.collisionBody.view.height - 0.5
    this.playerView.pivot.set(this.playerView.width / 2, this.playerView.height / 2)
    this.playerView.addChild(new Rectangle(0, 0, this.playerView.width, this.playerView.height, "#FFFFFF00"))

    this.view.pivot.set(this.playerView.width / 2, this.playerView.height / 2)


    // Setup Sword View
    this.swordAnimations = new AnimationController(animations)
    this.swordAnimations.setAnimation("sword").setFrame(0)
    this.swordView.addChild(this.swordAnimations.view)
    this.swordView.x = this.playerView.width / 2
    this.swordView.rotation = Math.PI / 2;
    this.swordView.y += 8
    this.swordCollider = new CollisionBody(engine, 0, 0, this.swordView.width, this.swordView.height, 'sword', true)
    this.swordView.addChild(this.swordCollider.view)
    this.swordCooldownMax = 30
    this.swordCooldown = 0
    this.slash = false

    this.collisionBody.onCollision((_, sides) => {
      if (sides.includes("bottom")) {
        this.jumpEnd = true
      }
    })

    this.swordCollider.onCollision((o, _) => {
      if (o.type === 'spike' && this.slash) {
        this.physicsBody.speed.y -= 8
        this.slash = false

      }
    })

    this.jumping = false;
    this.jumpHeight = this.view.height / 2;
    this.jumpLanded = false;
  }


  update(deltaTime: number) {
    this.swordCooldown = Math.max(this.swordCooldown - deltaTime, 0)
    this.slash = false

    if (this.lastDeath > 0) {
      this.lastDeath -= deltaTime;
      this.playerAnimations.setAnimation('walk').setFrame(0)
      this.physicsBody.speed.setX(0);
      return;
    }
    this.lastDeath = 0;

    if (this.controller.keys['right'].pressed) {
      this.playerAnimations.setAnimation("walk").play()
      this.playerView.scale.x = Math.abs(this.view.scale.x)
      this.physicsBody.speed.setX(2)
    } else if (this.controller.keys['left'].pressed) {
      this.playerView.scale.x = -Math.abs(this.view.scale.x)
      this.physicsBody.speed.setX(-2)
      this.playerAnimations.setAnimation("walk").play()
    } else {
      this.physicsBody.speed.setX(0)
      this.playerAnimations.setAnimation("walk").setFrame(0)
    }



    if (this.controller.keys.space.pressed && (this.physicsBody.onGround || this.jumping)) {
      if (!this.jumping) {
        this.jumping = true
        if (!this.jumpEnd) {
          this.playerAnimations.setAnimation("jump")
        }
        this.jumpStart = this.view.y
        let audio = new Audio(jump);
        audio.play();
      }

      if (!this.jumpEnd) {
        this.playerAnimations.setAnimation("jump").setFrame(1)
        this.physicsBody.speed.y -= 1 * deltaTime
        this.jumpLanded = false
      }

      if (this.jumpStart - this.view.y >= this.jumpHeight) {
        this.jumpEnd = true
      }
    }

    if (!this.controller.keys.space.pressed && this.physicsBody.onGround) {
      this.jumping = false
      this.jumpEnd = false
    }


    if (!this.jumping && this.physicsBody.onGround) {
      this.jumpLanded = true
    }


    if (this.controller.keys.down.pressed && this.swordCooldown === 0 && (Math.abs(this.physicsBody.speed.y) > 0.1)) {
      this.slash = true
      this.swordCooldown = this.swordCooldownMax
      this.swordAnimations.setAnimation('sword').setFrame(0).play()
    }

    if (this.physicsBody.speed.y > 0.1) {
      this.playerAnimations.setAnimation('jump').setFrame(2)

    }
  }

  static async Create(e: PhysicsEngine) {

    const characterSpriteSheet = new Spritesheet(
      Texture.from(atlasData.characters.meta.image),
      atlasData.characters
    )

    await characterSpriteSheet.parse()

    const playerWalk = new AnimatedSprite(characterSpriteSheet.animations.playerWalk)
    playerWalk.animationSpeed = 0.2
    playerWalk.scale = 1

    const playerJump = new AnimatedSprite(characterSpriteSheet.animations.playerJump)
    const playerSlash = new AnimatedSprite(characterSpriteSheet.animations.playerSlash)

    playerSlash.loop = false
    playerSlash.onComplete = () => { playerSlash.gotoAndStop(0); }

    const animations: PlayerAnimations = {
      walk: playerWalk,
      jump: playerJump,
      sword: playerSlash,
    }

    return new Player(controller, animations, e);
  }

}

