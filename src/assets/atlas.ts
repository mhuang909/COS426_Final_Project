import { SpritesheetData } from "pixi.js"
import CHARACTERS from './characters.png'
import TILES from './sheet.png'


type sheet = 'characters' | 'tiles';

export const atlasData: Record<sheet, SpritesheetData> = {
  characters: {
    meta: {
      image: CHARACTERS,
      scale: 1,
      format: 'RGBA8888',
      size: { w: 736, h: 128 },
    },
    frames: {
      player_walk_0: {
        frame: { x: 0, y: 32, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player_walk_1: {
        frame: { x: 32 * 1, y: 32, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player_walk_2: {
        frame: { x: 32 * 2, y: 32, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player_walk_3: {
        frame: { x: 32 * 3, y: 32, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player_jump_0: {
        frame: { x: 32 * 4, y: 32, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player_jump_1: {
        frame: { x: 32 * 5, y: 32, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player_jump_2: {
        frame: { x: 32 * 6, y: 32, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player_slash_0: {
        frame: { x: 32 * 4, y: 32 * 3, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player_slash_1: {
        frame: { x: 32 * 5, y: 32 * 3, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player_slash_2: {
        frame: { x: 32 * 6, y: 32 * 3, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player_slash_3: {
        frame: { x: 32 * 7, y: 32 * 3, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player_slash_4: {
        frame: { x: 32 * 8, y: 32 * 3, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
    },
    animations: {
      playerWalk: ['player_walk_0', 'player_walk_1', 'player_walk_2', 'player_walk_3'],
      playerJump: ['player_jump_0', 'player_jump_1', 'player_jump_2'],
      playerSlash: ['player_slash_4', 'player_slash_0', 'player_slash_1', 'player_slash_2', 'player_slash_3', 'player_slash_4']
    }
  },
  tiles: {
    meta: {
      image: TILES,
      scale: 1,
      format: 'RGBA8888',
      size: { w: 272, h: 128 },
    },
    frames: {
      blank: {
        frame: { x: 0, y: 3 * 16, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      grass_top: {
        frame: { x: 16 * 8, y: 0, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      solid: {
        frame: { x: 16 * 11, y: 16, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      spike: {
        frame: { x: 16 * 7, y: 16 * 7, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      fence_left: {
        frame: { x: 16 * 14, y: 16 * 3, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      fence_mid: {
        frame: { x: 16 * 15, y: 16 * 3, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      fence_right: {
        frame: { x: 16 * 16, y: 16 * 3, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      flower1: {
        frame: { x: 16 * 14, y: 16 * 6, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      flower2: {
        frame: { x: 16 * 14, y: 16 * 5, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      exit: {
        frame: { x: 16 * 14, y: 16, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      left_wall: {
        frame: { x: 16 * 12, y: 16, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      top_wall: {
        frame: { x: 16 * 11, y: 0, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      right_wall: {
        frame: { x: 16 * 10, y: 16, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      rock: {
        frame: { x: 16 * 16, y: 16 * 6, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },
      blank_dot: {
        frame: { x: 16 * 7, y: 16, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      },

    }
  }
}
