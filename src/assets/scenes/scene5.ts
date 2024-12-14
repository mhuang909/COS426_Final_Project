import { Platform } from "@components/objects/Platform/Platform";
import { CollisionBody } from "@components/physics/collisionbody";
import { SceneData } from "@components/scenes/Scene";

export const sceneData5: SceneData = {
  rows: 16,
  cols: 32,
  player: {
    x: 3.5,
    y: 12.8,
  },
  tiles:
    [
      11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 3, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 1, 0, 0, 1, 0, 1, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 2, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 1 ,0, 0, 0, 0, 0, 0, 2, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 12,
      10, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,  1, 0, 0, 0, 2, 0, 0,
      10, 0, 4, 5, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 9,
      2,  1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 1,
      2,  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,],
  collisions: [
    {
      create: (e, { x, y, w, h }) => new CollisionBody(e, x, y, w, h, 'exit', true),
      boxes: [
        { x: 31.5, y: 12, w: 1, h: 2 }
      ]
    },
    {
      create: (e, { x, y, w, h }) => new CollisionBody(e, x, y, w, h, 'spike', true),
      boxes: [
        { x: 6, y: 14, w: 23, h: 1 },
        { x: 5, y: 12, w: 1, h: 1 },
        { x: 8, y: 11, w: 1, h: 1 },
        { x: 11, y: 10, w: 1, h: 1 },
        { x: 10, y: 5, w: 1, h: 1 },
        { x: 13, y: 8, w: 1, h: 1 },
        { x: 14, y: 12, w: 1, h: 1 },
        { x: 17, y: 10, w: 1, h: 1 },
        { x: 15, y : 7, w: 1, h: 1 },
        { x: 18, y : 6, w: 1, h: 1 },
        { x: 20, y : 5, w: 1, h: 1 },
        { x: 22, y : 5, w: 1, h: 1 },
        { x: 22, y : 9, w: 1, h: 1 },
        { x: 20, y : 10, w: 1, h: 1 },
        { x: 24, y : 4, w: 1, h: 1 },
        { x: 27, y : 4, w: 1, h: 1 },
        { x: 25, y : 11, w: 1, h: 1 },
        { x: 29, y : 4, w: 1, h: 1 },
        { x: 30, y : 14, w: 1, h: 1 },



      ]
    },
    {
      create: (e, { x, y, w, h }) => new Platform(e, x, y, w, h),
      boxes: [
        { x: 0, y: 0, w: 32, h: 1 },
        { x: 0, y: 1, w: 1, h: 13 },
        { x: 31, y: 1, w: 1, h: 11 },
        { x: 0, y: 14, w: 6, h: 1 },
        { x: 5, y: 13, w: 1, h: 1 },
        { x: 29, y: 5, w: 1, h: 9 },
        { x: 8, y: 12, w: 1, h: 1 },
        { x: 11, y: 11, w: 1, h: 1 },
        { x: 10, y: 6, w: 1, h: 1 },
        { x: 13, y: 9, w: 1, h: 1 },
        { x: 14, y: 13, w: 1, h: 1 },
        { x: 17, y: 11, w: 1, h: 1 },
        { x: 15, y : 8, w: 1, h: 1 },
        { x: 18, y : 7, w: 1, h: 1 },
        { x: 20, y : 6, w: 1, h: 1 },
        { x: 22, y : 6, w: 1, h: 1 },
        { x: 22, y : 10, w: 1, h: 1 },
        { x: 20, y : 11, w: 1, h: 1 },
        { x: 24, y : 5, w: 1, h: 1 },
        { x: 27, y : 5, w: 1, h: 1 },
        { x: 25, y : 12, w: 1, h: 1 },



 
      ]
    }
  ]
}