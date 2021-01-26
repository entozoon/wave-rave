import {
  Bodies,
  Body,
  Engine,
  Events,
  Render,
  Runner,
  World,
  // Composites,
  // Common,
} from "matter-js";
export default class {
  public engine: Engine;
  public render: Render;
  public runner: Runner;
  public world: World;
  public World: any;
  public Bodies: any;
  public Body: any;
  public Events: any;
  constructor(props: any) {
    const { element, width, height } = props;
    const shouldRender = window.location.hostname == "localhost";
    this.engine = Engine.create();
    this.world = this.engine.world;
    this.runner = Runner.create();
    this.Bodies = Bodies;
    this.Body = Body;
    this.Events = Events;
    this.World = World;
    Runner.run(this.runner, this.engine);
    if (shouldRender) {
      this.render = Render.create({
        element,
        engine: this.engine,
        options: {
          width,
          height,
          // @ts-expect-error (types aren't up to date)
          showAngleIndicator: true,
          background: "transparent",
          wireframeBackground: "transparent",
        },
      });
      Render.run(this.render);
      // fit the render viewport to the scene
      // Render.lookAt(this.render, {
      //   min: { x: 0, y: 0 },
      //   max: { x: 640, y: 640 },
      // });
    }
  }
}
