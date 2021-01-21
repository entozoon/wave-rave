import {
  Engine,
  World,
  Render,
  Runner,
  Bodies,
  Composites,
  Common,
} from "matter-js";
import Pixi from "../engines/Pixi";
let body, hunk;
export const test = () => {
  // Rectangle
  body = new Pixi.Graphics();
  body.beginFill(0xde3249);
  body.drawRect(50, 50, 100, 100);
  body.endFill();
  console.log(body);
  Pixi.containerMain.addChild(body);
  //
  //
  var engine = Engine.create(),
    world = engine.world;
  var matterRender = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 640,
      height: 640,
      showAngleIndicator: true,
    },
  });
  Render.run(matterRender); // ************************** don't do this in production, innit
  var runner = Runner.create();
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
    Pixi.render();
    requestAnimationFrame(flop);
  };
  requestAnimationFrame(flop);
  //   var engine = Engine.create(),
  //   world = engine.world;
  // // create renderer
  // var render = Render.create({
  //   element: document.body,
  //   engine: engine,
  //   options: {
  //       width: 800,
  //       height: 600,
  //       showAngleIndicator: true
  //   }
  // });
};
