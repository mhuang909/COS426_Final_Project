import { Controller } from "@components/controller/Controller";
import { Player } from "@components/objects/Player/player";
import { AnimatedSprite, Application, Assets, Spritesheet, Texture } from "pixi.js";
import { atlasData } from "./assets/atlas";
import { Platform } from "@components/objects/Platform/Platform";
import { Tilemap } from "@pixi/tilemap";
import { sceneData3 } from "./assets/scenes/scene3"
import { PhysicsEngineInst } from "@components/physics/physics";


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
  let sceneData = sceneData3;

  let rows = sceneData.rows;
  let cols = sceneData.cols;
  const ids = [tileSpriteSheet.textures.blank, tileSpriteSheet.textures.grass_top, tileSpriteSheet.textures.solid, tileSpriteSheet.textures.spike, tileSpriteSheet.textures.fence_left,
  tileSpriteSheet.textures.fence_mid, tileSpriteSheet.textures.fence_right, tileSpriteSheet.textures.flower1, tileSpriteSheet.textures.flower2, tileSpriteSheet.textures.exit,
  tileSpriteSheet.textures.left_wall, tileSpriteSheet.textures.top_wall, tileSpriteSheet.textures.right_wall, tileSpriteSheet.textures.rock
  ]
  /* 
  id dict:
  0: tileSpriteSheet.textures.blank,
  1: tileSpriteSheet.textures.grass_top
  2: tileSpriteSheet.textures.solid
  3: tileSpriteSheet.textures.spike
  4: tileSpriteSheet.textures.fence_left
  5: tileSpriteSheet.textures.fence_mid
  6: tileSpriteSheet.textures.fence_right
  7: tileSpriteSheet.textures.flower1
  8: tileSpriteSheet.textures.flower2
  9: tileSpriteSheet.textures.exit
  10: tileSpriteSheet.textures.left_wall
  11: tileSpriteSheet.textures.top_wall
  12: tileSpriteSheet.textures.right_wall
  13: tileSpriteSheet.textures.rock

  */
  let index = 0;

  let scaleWidth = app.renderer.width / (cols * 16);
  let scaleHeight = app.renderer.height / (rows * 16);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let id = sceneData.data[index];
      console.log(i);
      tilemap.tile(ids[id], j * 16, i * 16)
      index++;
    }
  }


  tilemap.scale.x = scaleWidth;
  tilemap.scale.y = scaleHeight;
  app.stage.addChild(tilemap);


  const scene = {
    tiles: ["grass", "grass-top"],
    data: {
    }
  }

  const platform = new Platform(0, innerHeight - 16 * scaleHeight, cols * scaleWidth * 16, 16 * scaleHeight)


  //Add to stage
  app.stage.addChild(tilemap, player.view, platform.view);


  app.ticker.add((ticker) => {
    const deltaTime = ticker.deltaTime
    PhysicsEngineInst.update(deltaTime)
    player.update(deltaTime)
  })

  window.onresize = function(event) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    let scaleWidth = w / (cols * 16);
    let scaleHeight = h / (rows * 16);
    tilemap.scale.x = scaleWidth;
    tilemap.scale.y = scaleHeight;
    player.view.position.x = player.relativeX * w;
    player.view.position.y = player.relativeY * h;
  }

})();
