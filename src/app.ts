import { Controller } from "@components/controller/Controller";
import { Player } from "@components/objects/Player/player";
import { AnimatedSprite, Application, Assets, Spritesheet, Texture } from "pixi.js";
import { atlasData } from "./assets/atlas";
import { sceneData0 } from "./assets/scenes/scene0"
import { PhysicsEngineInst } from "@components/physics/physics";
import { Scene } from "@components/scenes/Scene";


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
  playerWalk.scale = 1

  const player = new Player(controller,
    {
      walk: playerWalk,
    }
  )

  const scene = new Scene(sceneData0, tileSpriteSheet)
  player.view.x = scene.view.width / 8
  player.view.y = scene.view.height / 2



  scene.view.addChild(player.view)

  //Add to stage
  app.stage.addChild(scene.view);


  app.ticker.add((ticker) => {
    // Resize the scene
    const scaleX = app.renderer.width / (scene.cols * 16)
    const scaleY = app.renderer.height / (scene.rows * 16)

    scene.view.scale.x = scaleX
    scene.view.scale.y = scaleY

    // Apply updates
    const deltaTime = ticker.deltaTime
    PhysicsEngineInst.update(deltaTime)
    player.update(deltaTime)
  })

})();
