import { Container } from "pixi.js";
import { Scene } from "./Scene";

export class SceneManager {
  view: Container;
  scenes: Scene[];
  ids: Record<string, number>
  currentScene: number

  constructor() {
    this.view = new Container();
    this.currentScene = -1
    this.scenes = []
    this.ids = {}
  }

  appendScene(id: string, scene: Scene): boolean {
    if (this.ids?.[id] !== undefined) return false;

    this.ids[id] = this.scenes.length
    this.scenes.push(scene)

    if (this.currentScene === -1) {
      this.currentScene = 0;
      this.view.addChild(this.scenes[this.currentScene].view)
    }

    return true
  }

  attach() {
    this.view.addChild(this.scenes[this.currentScene].view)
  }
  detatch() {
    this.view.removeChild(this.scenes[this.currentScene].view)
  }

  setScene(id: string) {
    const index = this.ids[id]
    if (index === undefined) return
    this.detatch()
    this.currentScene = index
    this.attach()
  }

  nextScene() {
    if (this.scenes.length === 0) return
    this.detatch();
    this.currentScene++
    this.currentScene %= this.scenes.length
    this.attach()
  }

  prevScene() {
    if (this.scenes.length === 0) return
    this.detatch()
    this.currentScene += this.scenes.length - 1
    this.currentScene %= this.scenes.length
    this.attach()
  }

  getScene(): Scene | undefined {
    if (this.currentScene < 0) return undefined
    return this.scenes[this.currentScene]
  }

  update(deltaTime: number) {
    this.getScene()?.update(deltaTime)
  }

}
