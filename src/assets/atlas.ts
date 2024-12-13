import { SpritesheetData } from "pixi.js"
import Image from './characters.png'

export const atlasData: SpritesheetData = {
  meta: {
    image: Image,
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
}
