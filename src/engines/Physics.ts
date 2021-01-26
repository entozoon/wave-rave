import {
  Engine,
  Render,
  // World,
  // Runner,
  // Bodies,
  // Composites,
  // Common,
} from "matter-js";
export default class {
  public Engine: Engine;
  public Render: Render;
  constructor(props: any) {
    const { width, height } = props;
    const shouldRender = window.location.hostname == "localhost";
    // Physics time, baby! Separate engine
    this.Engine = Engine.create();
    // const world = engine.world;
    this.Render = shouldRender
      ? Render.create({
          element: document.body,
          engine: this.Engine,
          options: {
            width,
            height,
            // @ts-expect-error (types aren't up to date)
            showAngleIndicator: true,
          },
        })
      : null;
  }
}
