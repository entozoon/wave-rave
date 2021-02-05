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
    // PIXI render translate
    Engine.renderer.layers.main.container.pivot.x = target.x - width / 2;
    Engine.renderer.layers.main.container.pivot.y = target.y - height / 2;
    // MatterJS render translate (localhost only)
    Engine.physics.Render.lookAt(Engine.physics.render, {
      min: { x: target.x - width / 2, y: target.y - height / 2 },
      max: { x: target.x + width / 2, y: target.y + height / 2 },
    });
  }
}
