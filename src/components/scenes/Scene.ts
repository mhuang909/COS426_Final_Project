import { Platform } from "@components/objects/Platform/Platform";
import { Tilemap } from "@pixi/tilemap";
import { Container, Spritesheet, SpritesheetData, TextureSource } from "pixi.js";


export type SceneData = {
  rows: number,
  cols: number,
  data: number[]
}


export class Scene {
  view: Container
  tilemap: Tilemap
  cols: number
  rows: number

  constructor(data: SceneData, spritesheet: Spritesheet<SpritesheetData>) {
    this.view = new Container();
    this.tilemap = new Tilemap(spritesheet.textureSource)
    this.cols = data.cols
    this.rows = data.rows

    this.render(data, spritesheet)
    this.view.addChild(this.tilemap)
  }

  render(data: SceneData, spritesheet: Spritesheet<SpritesheetData>) {
    const ids = ["blank", "grass_top", "solid", "spike", "fence_left",
      "fence_mid", "fence_right", "flower1", "flower2", "exit",
      "left_wall", "top_wall", "right_wall", "rock"]

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let id = data.data[i * this.cols + j];
        this.tilemap.tile(spritesheet.textures[ids[id] ?? "flower1"], j * 16, i * 16)
        if (id != 0) {
          this.buildPlatform(j * 16, i * 16, 16, 16, 1)
        }
      }
    }
  }

  buildPlatform(x: number, y: number, w: number, h: number, scale: number) {
    const platform = new Platform(x, y, w, h)
    platform.view.scale = scale
    this.view.addChild(platform.view)

  }
}
