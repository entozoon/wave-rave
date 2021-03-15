import Renderer from "./Renderer";
import Physics from "./Physics";
import Sound from "./Sound";
import { width, height } from "../config";
interface EngineInterface {
  element: HTMLElement;
  width: number;
  height: number;
  layers: {
    // Christ, that was hard to figure out! Get the type for the
    // constructor props of the class. [0] was the magic touch
    [key: string]: ConstructorParameters<typeof PIXI.Renderer>[0];
  };
}
class Engine {
  public width: number;
  public height: number;
  public renderer: Renderer;
  public physics: Physics;
  public sound: Sound;
  private updateCallbacks = [];
  constructor(props: EngineInterface) {
    Object.assign(this, props);
    this.renderer = new Renderer(props);
    this.physics = new Physics(props);
    this.sound = new Sound();
    this.physics.Events.on(this.physics.engine, "afterUpdate", () => {
      // this.updateCallbacks.forEach((c) => c());
      this.updateCallbacks.forEach((c) => {
        c();
        // console.log(typeof c);
        // console.log(c);
      });
      this.renderer.render();
    });
    // requestAnimationFrame(this.update);
  }
  // update = () => {
  //   this.updateCallbacks.forEach((c) => c());
  //   this.renderer.render();
  //   requestAnimationFrame(this.update);
  // };
  onUpdate = (callback: any) => {
    this.updateCallbacks.push(callback);
  };
}
export default new Engine({
  element: document.querySelector("#game"),
  width,
  height,
  layers: {
    water: {
      antialias: false,
      resolution: 1,
      // backgroundColor: 0x332222,
      transparent: false,
      preserveDrawingBuffer: true,
      clearBeforeRender: false,
    },
    main: {
      antialias: false,
      resolution: 1,
      transparent: true,
    },
  },
}); // Single instance
