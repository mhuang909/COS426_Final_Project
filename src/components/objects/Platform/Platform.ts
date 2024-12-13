import { Rectangle } from "@components/debug/Rectangle";
import { Tilemap } from "@pixi/tilemap";
import { Container } from "pixi.js";

export class Platform {
  view: Container;

  constructor(hTiles: number, wTiles: number, x: number, y: number, tile: Tilemap) {
    this.view = new Rectangle(x, y, tile.width * wTiles, tile.height * hTiles)
  }
}
