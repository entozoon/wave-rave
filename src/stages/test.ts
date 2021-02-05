import Engine from "../engines/Engine";
import Jetski from "../entities/Jetski";
import Controllable from "../behaviours/Controllable";
import Camera from "../behaviours/Camera";
import JetStream from "../effects/JetStream";
import { width, height } from "../config";
export const test = () => {
  let jetskis = [];
  jetskis.push(
    new Jetski({
      x: 100,
      y: 100,
      width: 20,
      height: 30,
    })
  );
  const hero = new Jetski({
    x: 200,
    y: 200,
    width: 20,
    height: 30,
  });
  // Delicious curries
  Object.assign(hero, [
    new Controllable({ hero }),
    new Camera({ hero }),
    new JetStream({ hero }),
  ]);
  jetskis.push(hero);

  // Obstacle test
  const obstacle = Engine.physics.Bodies.rectangle(400, 300, 1200, 50, {
    isStatic: true,
    render: { fillStyle: "#aaa" },
    // angle: 0.3,
    friction: 0,
  });
  Engine.physics.World.add(Engine.physics.world, [obstacle]);
  //
  var graphics = new Engine.renderer.pixi.Graphics();
  // anchor doesn't work on primitives so .. fuck them
  // graphics.anchor.set(0.5, 0.5);
  // pivot is basically offset, so that's handy
  graphics.pivot.x = 1200 / 2;
  graphics.pivot.y = 50 / 2;
  graphics.beginFill(0xffaa00);
  graphics.drawRect(400, 300, 1200, 50);
  // graphics.rotation = 0.3;
  Engine.renderer.layers.main.container.addChild(graphics);

  // Water fadeover
  var water = new Engine.renderer.pixi.Graphics();
  // anchor doesn't work on primitives so .. fuck them
  // water.anchor.set(0.5, 0.5);
  // pivot is basically offset, so that's handy
  water.pivot.x = 1200 / 2;
  water.pivot.y = 50 / 2;
  water.beginFill(0x220011);
  water.drawRect(0, 0, width, height);
  water.alpha = 0.15;
  // water.zIndex = 0;
  Engine.renderer.layers.water.container.addChild(water);
};

//
// CURRENT ISSUES:
// - swirls are getting garbage collection because they're offscreen but.. they're not
//   so they need to check against a camera viewport
// - water fadeover wants to position itself in the viewport too
// - if it even wants to exist? i didn't really want that effect
//
