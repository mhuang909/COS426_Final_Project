import { Controller } from "@components/controller/Controller";
import { Player } from "@components/objects/Player/player";
import { AnimatedSprite, Application, Assets, Spritesheet, Texture } from "pixi.js";
import { atlasData } from "./assets/atlas";

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

  Assets.add({ alias: 'characters', src: atlasData.meta.image })
  const textures = await Assets.load({ alias: 'characters' });
  textures.source.scaleMode = 'nearest'

  const spritesheet = new Spritesheet(
    Texture.from(atlasData.meta.image),
    atlasData
  )

  await spritesheet.parse()

  const playerWalk = new AnimatedSprite(spritesheet.animations.playerWalk)
  playerWalk.animationSpeed = 0.2
  playerWalk.scale = 3

  const player = new Player(controller,
    {
      walk: playerWalk,
    }
  )
  // Add to stage
  app.stage.addChild(player.view);

  app.ticker.add((ticker) => {
    player.update(ticker.deltaTime)
  })

})();
