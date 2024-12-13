import { controller } from "@components/controller/Controller";
import { Player } from "@components/objects/Player/player";
import { AnimatedSprite, Application, Assets, Spritesheet, Texture } from "pixi.js";
import { atlasData } from "./assets/atlas";
import { PhysicsEngineInst } from "@components/physics/physics";
import { Scenes } from "@components/scenes/Scenes";
import { SceneManager } from "@components/scenes/SceneManager";


document.body.style.margin = '0'; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling

(async () => {
  // Create a PixiJS application.
  const app = new Application();

  // Intialize the application.
  await app.init({ background: "#1099bb", resizeTo: window });

  // Then adding the application's canvas to the DOM body.
  document.body.appendChild(app.canvas);

  Assets.add({ alias: 'characters', src: atlasData.characters.meta.image })
  Assets.add({ alias: 'tiles', src: atlasData.tiles.meta.image })
  const textures = await Assets.load([{ alias: 'characters' }, { alias: 'tiles' }]);

  textures.characters.source.scaleMode = 'nearest'
  textures.tiles.source.scaleMode = 'nearest'

  const tileSpriteSheet = new Spritesheet(
    Texture.from(atlasData.tiles.meta.image),
    atlasData.tiles
  )
  await tileSpriteSheet.parse()

  const scenes = Scenes(tileSpriteSheet)
  const sceneManager = new SceneManager()
  for (const { id, scene } of scenes) {
    sceneManager.appendScene(id, scene)
  }

  app.stage.addChild(sceneManager.view)

  controller.attachKeyDownCallback(k => {
    if (k === "next") {
      sceneManager.nextScene()
    }
  })

  app.ticker.add((ticker) => {
    // Resize the scene
    const scene = sceneManager.getScene()
    const scaleX = app.renderer.width / (scene.cols * 16)
    const scaleY = app.renderer.height / (scene.rows * 16)
    const scale = Math.min(scaleX, scaleY)

    scene.view.scale = scale

    // Apply updates
    const deltaTime = ticker.deltaTime
    PhysicsEngineInst.update(deltaTime)
    sceneManager.update(deltaTime)
  })

})();
