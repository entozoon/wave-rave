import Engine from "../engines/Engine";
import { onScreen } from "../lib/utils";
export default class {
  private hero: any;
  private renderTexture;
  private swirl;
  // private particleContainer: PIXI.ParticleContainer;
  constructor({ hero }) {
    this.hero = hero;
    // this.particleContainer = new Engine.renderer.pixi.ParticleContainer(1000, {
    //   vertices: true,
    //   rotation: true,
    //   uvs: true,
    //   tint: true,
    // });
    // this.particleContainer.zIndex = 0;
    // Engine.renderer.layers.water.container.addChild(this.particleContainer);
    Engine.onUpdate(() => {
      this.update();
    });
    //
    //
    // this SHOULDN'T be created each frame, it's to be reused..
    // https://pixijs.download/v6.2.0/docs/PIXI.RenderTexture.html
    this.renderTexture = Engine.renderer.pixi.RenderTexture.create({
      width: 320,
      height: 320,
    });
  }
  update() {
    if (Math.random() > 0.5) {
      let swirl = Engine.renderer.pixi.Sprite.from("emitters/jet.png");
      swirl.position.x = this.hero.body.position.x + Math.random() * 100;
      swirl.position.y = this.hero.body.position.y + Math.random() * 100;
      swirl.tint = 0x0000ff * Math.random();
      //
      //
      // This all presumably creates infinite sprites?
      Engine.renderer.layers.water.container.addChild(swirl);
      // Trying to remove them after render but yeah that's not gonna work
      // Engine.renderer.layers.water.renderer.render(
      //   Engine.renderer.layers.water.container
      // );
      // Engine.renderer.layers.water.container.removeChild(swirl);
      //
      //
      // This is what I wanna get working, without addChild so they retain..
      // Engine.renderer.layers.water.renderer.render(swirl, {
      //   renderTexture:this.renderTexture,
      // });
      //
      //
    }
    //   if (Math.random() > 0.95) {
    //     let swirl = Engine.renderer.pixi.Sprite.from("emitters/jet.png");
    //     swirl.scale.x = 1;
    //     swirl.scale.y = 1;
    //     swirl.x = this.hero.body.position.x;
    //     swirl.y = this.hero.body.position.y;
    //     swirl.angle = Math.random() * Math.PI * 2;
    //     // swirl.tint = 0x333333 + r1 * 0x999999;
    //     // swirl.lifespan = 1000;
    //     // swirl.lifeFactor = 1;
    //     // swirl.zIndex = 1;
    //     this.particleContainer.addChild(swirl);
    //   }
    //   this.particleContainer.children.forEach((p) => {
    //     p.x += Math.sin(p.angle) * 5;
    //     p.y -= Math.cos(p.angle) * 5;
    //     // This isn't working, with camera pivoting ...
    //     if (!onScreen(p)) {
    //       this.particleContainer.removeChild(p);
    //     }
    //   });
  }
}
