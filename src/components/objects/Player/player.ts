import { Controller } from "@components/controller/Controller";
import { Assets, Container, Sprite } from "pixi.js";

export class Player {
  view: Container;
  controller: Controller;

  constructor(c: Controller) {
    this.view = new Container();
    this.controller = c;
  }



}
