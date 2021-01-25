import * as PIXI from "pixi.js";
import pixiSound from "pixi-sound";
interface RendererInterface {
  width: number;
  height: number;
  layers: {
    // Christ, that was hard to figure out! Get the type for the
    // constructor props of the class. [0] was the magic touch
    [key: string]: ConstructorParameters<typeof PIXI.Renderer>[0];
  };
}
class Renderer {
  public pixi: typeof PIXI;
  public sound: typeof pixiSound;
  // public containers: { [key: string]: PIXI.Container };
  public layers: {
    [key: string]: {
      renderer: PIXI.Renderer;
      container: PIXI.Container;
    };
  } = {};
  constructor(props: RendererInterface) {
    this.pixi = PIXI;
    this.pixi.utils.skipHello(); // screw that
    this.sound = pixiSound;
    // Sack antialiasing off with renderer settings and CSS
    this.pixi.settings.SCALE_MODE = this.pixi.SCALE_MODES.NEAREST;
    this.pixi.settings.RENDER_OPTIONS.antialias = false;
    this.pixi.settings.PRECISION_FRAGMENT = this.pixi.PRECISION.HIGH;
    // Trying to improve text rendering
    this.pixi.settings.SORTABLE_CHILDREN = true; // Enable zIndex
    for (let key in props.layers) {
      const renderer = this.pixi.autoDetectRenderer(props.layers[key]);
      this.layers[key] = {
        renderer,
        container: new PIXI.Container(),
      };
      document.getElementById("game").appendChild(renderer.view);
    }
  }
  addBackground() {}
  render() {
    for (let key in this.layers) {
      const { renderer, container } = this.layers[key];
      renderer.render(container);
    }
  }
}
export default new Renderer({
  width: 640,
  height: 640,
  layers: {
    waves: {
      width: 640,
      height: 640,
      antialias: false,
      resolution: 1,
      backgroundColor: 0x222222,
      transparent: false,
      preserveDrawingBuffer: true,
      clearBeforeRender: false,
    },
    main: {
      width: 640,
      height: 640,
      antialias: false,
      resolution: 1,
      transparent: true,
    },
  },
}); // Single instance
