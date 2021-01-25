import {
  Engine,
  World,
  Render,
  Runner,
  Bodies,
  Composites,
  Common,
} from "matter-js";
import Renderer from "../engines/Renderer";
let body, hunk;
export const test = () => {
  // Rectangle
  body = new Renderer.pixi.Graphics();
  body.beginFill(0xde3249);
  body.drawRect(50, 50, 100, 100);
  body.endFill();
  Renderer.layers.main.container.addChild(body);
  //
  const engine = Engine.create(),
    world = engine.world;
  const matterRender = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 640,
      height: 640,
      showAngleIndicator: true,
    },
  });
  // Only render Matter locally
  if (window.location.hostname == "localhost") {
    Render.run(matterRender);
  }
  const runner = Runner.create();
  Runner.run(runner, engine);
  World.add(world, [
    Bodies.rectangle(400, 600, 1200, 50.5, {
      isStatic: true,
      render: { fillStyle: "#060a19" },
    }),
  ]);
  hunk = Bodies.polygon(400, 10, 5, 60, {
    restitution: 0.6,
    friction: 0.1,
  });
  World.add(world, [hunk]);
  // fit the render viewport to the scene
  Render.lookAt(matterRender, {
    min: { x: 0, y: 0 },
    max: { x: 640, y: 640 },
  });
  //
  //
  // POINTERS! pointers myke!
  //
  //
  const flop = () => {
    body.position = hunk.position;
    body.rotation = hunk.angle;
    Renderer.render();
    requestAnimationFrame(flop);
  };
  requestAnimationFrame(flop);
  //   const engine = Engine.create(),
  //   world = engine.world;
  // // create renderer
  // const render = Render.create({
  //   element: document.body,
  //   engine: engine,
  //   options: {
  //       width: 800,
  //       height: 600,
  //       showAngleIndicator: true
  //   }
  // });
};
