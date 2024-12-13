import { Graphics } from "pixi.js";

export class Rectangle extends Graphics {

  constructor(x: number, y: number, w: number, h: number) {
    super()
    this.beginPath();
    this.setStrokeStyle("#FF0000")
    this.rect(x, y, w, h)
    this.stroke()
    this.closePath()
  }
}
