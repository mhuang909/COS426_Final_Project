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
      grass_top: {
        frame: { x: 128, y: 0, h: 16, w: 16 },
        sourceSize: { w: 16, h: 16 },
        spriteSourceSize: { w: 6, h: 16, x: 0, y: 0 }
      }
    }
  }
}
