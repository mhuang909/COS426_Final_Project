import { Graphics, StrokeInput } from "pixi.js";

export class Rectangle extends Graphics {

  constructor(x: number, y: number, w: number, h: number, c?: StrokeInput) {
    super()
    this.beginPath();
    this.setStrokeStyle(c ?? "#FF0000")
    this.rect(x, y, w, h)
    this.stroke()
    this.closePath()
  }
}
