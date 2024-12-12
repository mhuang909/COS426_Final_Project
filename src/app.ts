import { Controller } from "@components/controller/Controller";
import { Player } from "@components/objects/Player/player";
import { Application, Assets, Sprite } from "pixi.js";

(async () => {
  // Create a PixiJS application.
  const app = new Application();

  // Intialize the application.
  await app.init({ background: "#1099bb", resizeTo: window });

  // Then adding the application's canvas to the DOM body.
  document.body.appendChild(app.canvas);
  // Load the bunny texture.
  const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

  // Create a new Sprite from an image path
  const bunny = new Sprite(texture);
  const controller = new Controller();

  const player = new Player(controller)

  // Add to stage
  app.stage.addChild(player.view);

  // Center the sprite's anchor point
  bunny.anchor.set(0.5);

  // Move the sprite to the center of the screen
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  app.ticker.add((time) => {
    bunny.rotation += 0.1 * time.deltaTime
  })
})();
