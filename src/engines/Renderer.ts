import * as PIXI from "pixi.js";
import pixiSound from "pixi-sound";
class Renderer {
  public pixi: typeof PIXI;
  public sound: typeof pixiSound;
  public rendererWaves: PIXI.Renderer;
  public rendererMain: PIXI.Renderer;
  public containerWaves: PIXI.Container;
  public containerMain: PIXI.Container;
  create = () =>
    new Promise<void>((resolve) => {
      this.pixi = PIXI;
      this.pixi.utils.skipHello();
      this.sound = pixiSound;
      // Sack antialiasing off with renderer settings and CSS
      this.pixi.settings.SCALE_MODE = this.pixi.SCALE_MODES.NEAREST;
      this.pixi.settings.RENDER_OPTIONS.antialias = false;
      this.pixi.settings.SORTABLE_CHILDREN = true; // Enable zIndex
      this.pixi.settings.PRECISION_FRAGMENT = this.pixi.PRECISION.HIGH; // trying to improve text rendering
      this.rendererWaves = this.pixi.autoDetectRenderer({
        width: 640,
        height: 640,
        antialias: false,
        resolution: 1,
        backgroundColor: 0x222222,
        transparent: false,
        preserveDrawingBuffer: true,
        clearBeforeRender: false,
      });
      this.rendererMain = this.pixi.autoDetectRenderer({
        width: 640,
        height: 640,
        antialias: false,
        resolution: 1,
        transparent: true,
      });
      document.getElementById("game").appendChild(this.rendererWaves.view);
      document.getElementById("game").appendChild(this.rendererMain.view);
      this.containerWaves = new PIXI.Container();
      this.containerMain = new PIXI.Container();
      resolve();
    });
  addBackground() {}
  render() {
    this.rendererWaves.render(this.containerWaves);
    this.rendererMain.render(this.containerMain);
  }
}
export default new Renderer(); // Single instance
