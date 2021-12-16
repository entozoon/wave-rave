import * as PIXI from "pixi.js"; // maybe obsolete with v6
interface RendererInterface {
  element: HTMLElement;
  width: number;
  height: number;
  layers: {
    // Christ, that was hard to figure out! Get the type for the
    // constructor props of the class. [0] was the magic touch
    [key: string]: ConstructorParameters<typeof PIXI.Renderer>[0];
  };
}
export default class {
  public pixi: typeof PIXI;
  public layers: {
    [key: string]: {
      renderer: PIXI.AbstractRenderer;
      container: PIXI.Container;
    };
  } = {};
  constructor(props: RendererInterface) {
    const { element, width, height } = props;
    this.pixi = PIXI;
    this.pixi.utils.skipHello(); // screw that
    // Sack antialiasing off with renderer settings and CSS
    this.pixi.settings.SCALE_MODE = this.pixi.SCALE_MODES.NEAREST;
    this.pixi.settings.RENDER_OPTIONS.antialias = false;
    this.pixi.settings.PRECISION_FRAGMENT = this.pixi.PRECISION.HIGH;
    // Trying to improve text rendering
    this.pixi.settings.SORTABLE_CHILDREN = true; // Enable zIndex
    for (let key in props.layers) {
      const renderer = this.pixi.autoDetectRenderer(
        Object.assign(props.layers[key], { width, height })
      );
      this.layers[key] = {
        renderer,
        container: new PIXI.Container(),
      };
      element.appendChild(renderer.view);
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
