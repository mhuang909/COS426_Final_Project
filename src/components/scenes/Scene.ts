import { Platform } from "@components/objects/Platform/Platform";
import { Player } from "@components/objects/Player/player";
import { PhysicsEngine } from "@components/physics/physics";
import { Tilemap } from "@pixi/tilemap";
import { Container, Spritesheet, SpritesheetData } from "pixi.js";
import spike from '../../assets/audio/spike.mp3';


export type SceneData = {
  rows: number,
  cols: number,
  player: {
    x: number,
    y: number
  },
  tiles: number[]
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
  playerStart: { x: number, y: number }
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
    this.playerStart = data.player
    this.init(data)
  }

  async init(data: SceneData) {
    this.player = await Player.Create(this.physicsEngine)

    this.player.collisionBody.onCollision((o, _) => {

      const pcLeftRight = (
        (this.player.collisionBody.maxY() > o.maxY() ? o.maxY() : this.player.collisionBody.maxY())
        - (this.player.collisionBody.minY() < o.minY() ? o.minY() : this.player.collisionBody.minY())) / (this.player.collisionBody.maxY() - this.player.collisionBody.minY())
      if (o.type === 'spike' && pcLeftRight > 0.4) {
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

    this.reset()
    this.view.addChild(this.player.view)
  }

  reset() {
    this.player.view.x = this.playerStart.x * 16
    this.player.view.y = this.playerStart.y * 16
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
