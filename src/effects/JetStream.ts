import Engine from "../engines/Engine";
import { onScreen } from "../lib/utils";
export default class {
  private hero: any;
  private particleContainer: PIXI.ParticleContainer;
  constructor({ hero }) {
    this.hero = hero;
    this.particleContainer = new Engine.renderer.pixi.ParticleContainer(1000, {
      vertices: true,
      rotation: true,
      uvs: true,
      tint: true,
    });
    this.particleContainer.zIndex = 0;
    Engine.renderer.layers.water.container.addChild(this.particleContainer);
    Engine.onUpdate(() => {
      this.update();
    });
  }
  update() {
    if (Math.random() > 0.95) {
      let swirl = Engine.renderer.pixi.Sprite.from("emitters/jet.png");
      swirl.scale.x = 1;
      swirl.scale.y = 1;
      swirl.x = this.hero.body.position.x;
      swirl.y = this.hero.body.position.y;
      swirl.angle = Math.random() * Math.PI * 2;
      // swirl.tint = 0x333333 + r1 * 0x999999;
      // swirl.lifespan = 1000;
      // swirl.lifeFactor = 1;
      // swirl.zIndex = 1;
      this.particleContainer.addChild(swirl);
    }
    this.particleContainer.children.forEach((p) => {
      p.x += Math.sin(p.angle) * 5;
      p.y -= Math.cos(p.angle) * 5;
      // This isn't working, with camera pivoting ...
      if (!onScreen(p)) {
        this.particleContainer.removeChild(p);
      }
    });
  }
}
