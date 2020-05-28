import { Container } from "@pixi/display";
import { autoDetectRenderer } from "@pixi/core";
import * as PIXI from "pixi.js";
// import * as PIXI from "@pixi/core";
// import { settings } from "@pixi/settings";
// export { Sprite } from "@pixi/sprite";
import pixiSound from "pixi-sound";
class Pixi {
  sound = pixiSound;
  containerMain = new Container();
  rendererMain = autoDetectRenderer({
    width: 64,
    height: 64,
    resolution: 1,
    transparent: true,
  });
  settings;
  constructor() {
    Object.assign(this, PIXI);
    Object.assign(this.settings, {
      SCALE_MODE: PIXI.SCALE_MODES.NEAREST,
      // Sack antialiasing off with both renderer settings and CSS
      RENDER_OPTIONS: Object.assign(this.settings.RENDER_OPTIONS, {
        antialias: false,
      }),
      SORTABLE_CHILDREN: true, // Enable zIndex
      RECISION_FRAGMENT: "highp", // trying to improve text rendering
    });
    // this.rendererBgBlood = this.autoDetectRenderer({
    //   width: 64,
    //   height: 64,
    //   antialias: false,
    //   resolution: 1,
    //   backgroundColor: 0x222222,
    //   transparent: false,
    //   preserveDrawingBuffer: true,
    //   clearBeforeRender: false,
    // });
    // document.getElementById("game").appendChild(this.rendererBgBlood.view);
    document.getElementById("game").appendChild(this.rendererMain.view);
    // this.containerBgBlood = new PIXI.Container();
    // this.containerMain = new PIXI.Container();
  }
  addBackground() {}
  render() {
    // this.rendererBgBlood.render(this.containerBgBlood);
    this.rendererMain.render(this.containerMain);
  }
}
export const pixi = new Pixi(); // Single instance
export const Sprite = PIXI.Sprite;
export const Texture = PIXI.Texture;
// export const Container = PIXI.Container;
