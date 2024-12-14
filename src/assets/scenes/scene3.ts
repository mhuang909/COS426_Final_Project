import { CollisionBody } from "@components/physics/collisionbody";
import { SceneData } from "@components/scenes/Scene";

export const sceneData3: SceneData = {
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
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 14, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 14, 2, 0, 0, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 3, 0, 2, 0, 2, 2, 0, 3, 0, 0, 0, 0, 0, 12,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 14, 0, 2, 0, 0, 0, 0, 0, 0,
      10, 0, 4, 5, 6, 0, 0, 1, 0, 1, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 9,
      2, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 3, 3, 3, 3, 1, 1,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,],
  platforms: [
    { x: 0, y: 0, w: 32, h: 1 },
    { x: 0, y: 1, w: 1, h: 13 },
    { x: 31, y: 1, w: 1, h: 11 },
    { x: 0, y: 14, w: 6, h: 1 },
    { x: 7, y: 13, w: 1, h: 1 },
    { x: 9, y: 13, w: 1, h: 1 },
    { x: 11, y: 11, w: 1, h: 1 },
    { x: 8, y: 10, w: 2, h: 1 },
    { x: 9, y: 9, w: 1, h: 1 },
    { x: 7, y: 8, w: 1, h: 1 },
    { x: 6, y: 7, w: 1, h: 1 },
    { x: 4, y: 5, w: 1, h: 1 },
    { x: 7, y: 3, w: 11, h: 1 },
    { x: 14, y: 13, w: 1, h: 2 },
    { x: 16, y: 12, w: 1, h: 3 },
    { x: 18, y: 12, w: 1, h: 3 },
    { x: 20, y: 11, w: 1, h: 4 },
    { x: 22, y: 10, w: 1, h: 5 },
    { x: 23, y: 9, w: 1, h: 6 },
    { x: 25, y: 12, w: 1, h: 3 },
    { x: 21, y: 6, w: 1, h: 1 },
    { x: 19, y: 5, w: 1, h: 1 },
    { x: 30, y: 14, w: 2, h: 1 },
  ],
  spikes: [
    { x: 6, y: 14, w: 8, h: 1 },
    { x: 6, y: 6, w: 1, h: 1 },
    { x: 7, y: 7, w: 1, h: 1 },
    { x: 15, y: 14, w: 1, h: 1 },
    { x: 17, y: 14, w: 1, h: 1 },
    { x: 19, y: 14, w: 1, h: 1 },
    { x: 21, y: 14, w: 1, h: 1 },
    { x: 24, y: 14, w: 1, h: 1 },
    { x: 26, y: 14, w: 4, h: 1 },
    { x: 14, y: 12, w: 1, h: 1 },
    { x: 16, y: 11, w: 1, h: 1 },
    { x: 18, y: 11, w: 1, h: 1 },
    { x: 20, y: 10, w: 1, h: 1 },
    { x: 22, y: 9, w: 1, h: 1 },
    { x: 23, y: 8, w: 1, h: 1 },
    { x: 21, y: 5, w: 1, h: 1 },
    { x: 19, y: 4, w: 1, h: 1 },
    { x: 25, y: 11, w: 1, h: 1 },
  ],
  collisions: [
    {
      create: (e, { x, y, w, h }) => new CollisionBody(e, x, y, w, h, 'exit', true),
      boxes: [
        { x: 31.5, y: 12, w: 1, h: 2 }
      ]
    }
  ]
}
