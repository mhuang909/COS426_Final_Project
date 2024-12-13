import { Controller } from "@components/controller/Controller";
import { Player } from "@components/objects/Player/player";
import { AnimatedSprite, Application, Assets, Spritesheet, Texture } from "pixi.js";
import { atlasData } from "./assets/atlas";
import { Platform } from "@components/objects/Platform/Platform";
import { Tilemap } from "@pixi/tilemap";
import { sceneData } from "./assets/scene"


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
  // console.log(app.renderer.height);

  let rows = sceneData.rows;
  let cols = sceneData.cols;
  const ids = [tileSpriteSheet.textures.grass_top]
  let index = 0;
  let scaleWidth = app.renderer.width / ( 8 * 16);
  let scaleHeight = app.renderer.height / (8 * 16);

  for (let i = 0; i < rows; i++){
    for (let j = 0; j < cols; j++){
      let id = sceneData.data[index];
      tilemap.tile(ids[id], i * 16, j * 16)
      index++;
    }
  }

  // tilemap.tile(tileSpriteSheet.textures.grass_top, 0, 0)
  // tilemap.tile(tileSpriteSheet.textures.grass_top, 32, 0)
  tilemap.scale.x = scaleWidth;
  tilemap.scale.y = scaleHeight;

  //tilemap.addChild(player.view);
  const scene = {
    tiles: ["grass", "grass-top"],
    data: {
    }
  }

  const platform = new Platform(3, 4, 300, 300, tilemap)


  //Add to stage
  app.stage.addChild(tilemap, player.view);

  app.ticker.add((ticker) => {
    player.update(ticker.deltaTime)
  })
  window.onresize = function (event){    
    var w = window.innerWidth;    
    var h = window.innerHeight;    
    let scaleWidth = w / ( 8 * 16);
    let scaleHeight = h / (8 * 16);
    tilemap.scale.x = scaleWidth;
    tilemap.scale.y = scaleHeight;
    app.stage.addChild(tilemap);
    player.view.position.x = player.relativeX * w;
    player.view.position.y = player.relativeY * h;
    app.stage.addChild(player.view);
    }

})();
