import Engine from "../engines/Engine";
import { width, height } from "../config";
export default class {
  private hero: any;
  constructor({ hero }) {
    this.hero = hero;
    Engine.onUpdate(() => {
      this.update();
    });
  }
  update() {
    const target = this.hero.body.position;
    // PIXI render translate (separate, as I'll probably want a HUD)
    Engine.renderer.layers.main.container.pivot.x = target.x - width / 2;
    Engine.renderer.layers.main.container.pivot.y = target.y - height / 2;
    Engine.renderer.layers.water.container.pivot.x = target.x - width / 2;
    Engine.renderer.layers.water.container.pivot.y = target.y - height / 2;
    // Engine.renderer.layers.water.container.x++;
    // Engine.renderer.layers.water.container.setTransform(10, 0);
    // Engine.renderer.layers.water.container.transform.updateTransform(
    //   new PIXI.Transform({
    //     scale: 2,
    // can't figure this out
    //   })
    // );
    // could maybe try https://pixijs.download/dev/docs/PIXI.AbstractRenderer.html
    // MatterJS render translate (localhost only)
    Engine.physics.Render.lookAt(Engine.physics.render, {
      min: { x: target.x - width / 2, y: target.y - height / 2 },
      max: { x: target.x + width / 2, y: target.y + height / 2 },
    });
  }
}
