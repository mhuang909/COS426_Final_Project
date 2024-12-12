import { Controller } from "@components/controller/Controller";
import { Player } from "@components/objects/Player/player";
import { AnimatedSprite, Application, Assets, Spritesheet, Texture } from "pixi.js";
import { atlasData } from "./assets/atlas";

(async () => {
  // Create a PixiJS application.
  const app = new Application();

  // Intialize the application.
  await app.init({ background: "#1099bb", resizeTo: window });

  // Then adding the application's canvas to the DOM body.
  document.body.appendChild(app.canvas);

  // Create a new Sprite from an image path
  const controller = new Controller();

  const player = new Player(controller)
  Assets.add({ alias: 'characters', src: atlasData.meta.image })
  const textures = await Assets.load({ alias: 'characters' });
  textures.source.scaleMode = 'nearest'

  const spritesheet = new Spritesheet(
    Texture.from(atlasData.meta.image),
    atlasData
  )

  await spritesheet.parse()

  const anim = new AnimatedSprite(spritesheet.animations.player)

  anim.animationSpeed = 0.15
  anim.scale = 3
  anim.texture.uvs
  anim.play();


  // Add to stage
  app.stage.addChild(player.view, anim);

})();
