import { Controller } from "@components/controller/Controller";
import { Player } from "@components/objects/Player/player";
import { AnimatedSprite, Application, Assets, Spritesheet, Texture } from "pixi.js";
import { atlasData } from "./assets/atlas";
import { Platform } from "@components/objects/Platform/Platform";
import { Tilemap } from "@pixi/tilemap";

document.body.style.margin = '0'; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling

(async () => {
  // Create a PixiJS application.
  const app = new Application();

  // Intialize the application.
  await app.init({ background: "#1099bb", resizeTo: window });

  // Then adding the application's canvas to the DOM body.
  document.body.appendChild(app.canvas);

  // Create a new Sprite from an image path
  const controller = new Controller();

  Assets.add({ alias: 'characters', src: atlasData.characters.meta.image })
  Assets.add({ alias: 'tiles', src: atlasData.tiles.meta.image })
  const textures = await Assets.load([{ alias: 'characters' }, { alias: 'tiles' }]);

  textures.characters.source.scaleMode = 'nearest'
  textures.tiles.source.scaleMode = 'nearest'

  const characterSpriteSheet = new Spritesheet(
    Texture.from(atlasData.characters.meta.image),
    atlasData.characters
  )
  const tileSpriteSheet = new Spritesheet(
    Texture.from(atlasData.tiles.meta.image),
    atlasData.tiles
  )
  await characterSpriteSheet.parse()
  await tileSpriteSheet.parse()

  const playerWalk = new AnimatedSprite(characterSpriteSheet.animations.playerWalk)
  playerWalk.animationSpeed = 0.2
  playerWalk.scale = 3

  const player = new Player(controller,
    {
      walk: playerWalk,
    }
  )

  const tilemap = new Tilemap(tileSpriteSheet.textureSource)
  console.log(tileSpriteSheet.textures.grass_top)
  tilemap.tile(tileSpriteSheet.textures.grass_top, 32, 0)
  tilemap.tile(tileSpriteSheet.textures.grass_top, 32, 0)
  tilemap.scale = 8


  const scene = {
    tiles: ["grass", "grass-top"],
    data: {
    }
  }

  const platform = new Platform(3, 4, 300, 300, tilemap)

  //Add to stage
  app.stage.addChild(player.view, tilemap, platform.view);

  app.ticker.add((ticker) => {
    player.update(ticker.deltaTime)
  })

})();
