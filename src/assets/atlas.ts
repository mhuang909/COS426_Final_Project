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
      player1: {
        frame: { x: 0, y: 0, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player2: {
        frame: { x: 32, y: 0, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player3: {
        frame: { x: 64, y: 0, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      },
      player4: {
        frame: { x: 96, y: 0, h: 32, w: 32 },
        sourceSize: { w: 32, h: 32 }
      }
    },
    animations: {
      playerWalk: ['player1', 'player2', 'player3', 'player4']
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

    }
  }
}
