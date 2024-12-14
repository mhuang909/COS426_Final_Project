import { Platform } from "@components/objects/Platform/Platform";
import { Player } from "@components/objects/Player/player";
import { PhysicsEngine } from "@components/physics/physics";
import { Tilemap } from "@pixi/tilemap";
import { Container, Spritesheet, SpritesheetData } from "pixi.js";
import spike from '../../assets/audio/spike.mp3';
import { Exit } from "@components/objects/Exit/Exit";
import { CollisionBody } from "@components/physics/collisionbody";


export type SceneData = {
  rows: number,
  cols: number,
  player: {
    x: number,
    y: number
  },
  tiles: number[]
  platforms?: { x: number, y: number, w: number, h: number }[]
  spikes?: { x: number, y: number, w: number, h: number }[],
  collisions?: {
    create: (engine: PhysicsEngine, data: { x: number, y: number, w: number, h: number }) => { view: Container },
    boxes: { x: number, y: number, w: number, h: number }[]
  }[]

}


export class Scene {
  view: Container
  tilemap: Tilemap
  cols: number
  rows: number
  player: Player
  physicsEngine: PhysicsEngine
  nextScene?: () => void

  constructor(data: SceneData, spritesheet: Spritesheet<SpritesheetData>) {
    this.view = new Container();
    this.tilemap = new Tilemap(spritesheet.textureSource)
    this.cols = data.cols
    this.rows = data.rows

    this.physicsEngine = new PhysicsEngine()

    this.render(data, spritesheet)
    this.view.addChild(this.tilemap)
    this.buildPlatforms(data)
    this.init(data)
  }

  async init(data: SceneData) {
    this.player = await Player.Create(this.physicsEngine)
    this.player.view.x = data.player.x * 16
    this.player.view.y = data.player.y * 16

    this.player.collisionBody.onCollision((o, sides) => {

      if (o.type === 'spike') {
        const spikeaudio = new Audio(spike)
        spikeaudio.play();
        this.player.lastDeath = 20;
        this.player.view.x = data.player.x * 16
        this.player.view.y = data.player.y * 16
        return;
      } else if (o.type === 'exit') {
        this.nextScene?.()
      }
    })



    this.view.addChild(this.player.view)
  }

  render(data: SceneData, spritesheet: Spritesheet<SpritesheetData>) {
    const ids = ["blank", "grass_top", "solid", "spike", "fence_left",
      "fence_mid", "fence_right", "flower1", "flower2", "exit",
      "left_wall", "top_wall", "right_wall", "rock", "blank_dot"]

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let id = data.tiles[i * this.cols + j];
        this.tilemap.tile(spritesheet.textures[ids[id] ?? "flower1"], j * 16, i * 16)
      }
    }
  }

  buildPlatforms(data: SceneData) {
    if (!data.platforms) return;
    for (const { x, y, w, h } of data.platforms) {
      this.buildPlatform(x * 16, y * 16, w * 16, h * 16)
    }
    for (const { x, y, w, h } of data.spikes) {
      this.view.addChild(new CollisionBody(this.physicsEngine, x * 16, y * 16, w * 16, h * 16, 'spike').view)
    }

    if (!data.collisions) return;
    for (const { create, boxes } of data.collisions) {
      for (const { x, y, w, h } of boxes) {
        this.view.addChild(create(this.physicsEngine, { x: x * 16, y: y * 16, w: w * 16, h: h * 16 }).view)
      }
    }
  }

  buildPlatform(x: number, y: number, w: number, h: number) {
    const platform = new Platform(this.physicsEngine, x, y, w, h)
    this.view.addChild(platform.view)

  }

  update(deltaTime: number) {
    this.physicsEngine.update(deltaTime)
    this.player.update(deltaTime)
  }
}
