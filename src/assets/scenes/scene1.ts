import { SceneData } from "@components/scenes/Scene";
import { AnimatedSprite, Spritesheet, Texture } from "pixi.js";
import { atlasData } from "../atlas";
import { Player, PlayerAnimations } from "@components/objects/Player/player";
import { controller } from "@components/controller/Controller";

export const sceneData1: SceneData = {
  rows: 16,
  cols: 32,
  player: {
    x: 3.5,
    y: 12.8,
    Player: async (scene) => {
      const characterSpriteSheet = new Spritesheet(
        Texture.from(atlasData.characters.meta.image),
        atlasData.characters
      )
      await characterSpriteSheet.parse()
      const playerWalk = new AnimatedSprite(characterSpriteSheet.animations.playerWalk)
      playerWalk.animationSpeed = 0.2
      playerWalk.scale = 1

      const animations: PlayerAnimations = {
        walk: playerWalk,
      }

      return new Player(controller, animations, scene.physicsEngine)
    }
  },
  tiles:
    [
      11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 1, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 13, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 8, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 1, 0, 0, 0, 2, 2, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 2, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 1, 1, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      10, 0, 4, 5, 6, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
      2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    ],
  platforms: [
    { x: 0, y: 0, w: 32, h: 1 },
    { x: 0, y: 1, w: 1, h: 14 },
    { x: 31, y: 1, w: 1, h: 11 },
    { x: 1, y: 14, w: 5, h: 1 },
    { x: 6, y: 13, w: 6, h: 2 },
    { x: 7, y: 11, w: 4, h: 2 },
    { x: 8, y: 4, w: 2, h: 7 },
    { x: 9, y: 2, w: 1, h: 2 },
    { x: 3, y: 9, w: 3, h: 1 },
    { x: 4, y: 7, w: 1, h: 1 },
    { x: 5, y: 5, w: 1, h: 1 },
    { x: 12, y: 9, w: 1, h: 1 },
    { x: 14, y: 8, w: 2, h: 1 },
    { x: 18, y: 8, w: 1, h: 1 },
    { x: 22, y: 8, w: 1, h: 1 },
    { x: 20, y: 7, w: 1, h: 1 },
    { x: 20, y: 7, w: 1, h: 1 },
    { x: 16, y: 6, w: 1, h: 1 },
    { x: 21, y: 6, w: 1, h: 1 },
    { x: 23, y: 11, w: 3, h: 1 },
    { x: 26, y: 10, w: 2, h: 1 },
    { x: 16, y: 12, w: 1, h: 1 },
    { x: 30, y: 14, w: 2, h: 1 },
  ],
  spikes: [
    { x: 12, y: 14, w: 18, h: 1 }
  ]
}
