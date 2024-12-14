import { Spritesheet, SpritesheetData } from "pixi.js";
import { Scene } from "./Scene";
import { sceneData0 } from "../../assets/scenes/scene0";
import { sceneData1 } from "../../assets/scenes/scene1";
import { sceneData2 } from "../../assets/scenes/scene2";
import { sceneData3 } from "../../assets/scenes/scene3";
import { sceneData4 } from "../../assets/scenes/scene4";
import { sceneData5 } from "../../assets/scenes/scene5";

export const Scenes = (spritesheet: Spritesheet<SpritesheetData>): { id: string, scene: Scene }[] => [
  { id: "level_0", scene: new Scene(sceneData0, spritesheet) },
  { id: "level_1", scene: new Scene(sceneData1, spritesheet) },
  { id: "level_2", scene: new Scene(sceneData2, spritesheet) },
  { id: "level_3", scene: new Scene(sceneData3, spritesheet) },
  { id: "level_4", scene: new Scene(sceneData4, spritesheet) },
  { id: "level_5", scene: new Scene(sceneData5, spritesheet) },
]
