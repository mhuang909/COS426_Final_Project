import { Rectangle } from "@components/debug/Rectangle";
import { CollisionBody } from "@components/physics/collisionbody";
import { Tilemap } from "@pixi/tilemap";
import { Container } from "pixi.js";

export class Platform {
  view: Container;
  collider: CollisionBody

  constructor(hTiles: number, wTiles: number, x: number, y: number, tile: Tilemap) {
    this.view = new Container()
    this.view.position.set(x, y)
    this.view.addChild(new Rectangle(0, 0, tile.width * wTiles, tile.height * hTiles))
    this.collider = new CollisionBody(tile.width * wTiles, tile.height * hTiles)
    this.view.addChild(this.collider.view)
  }
}
