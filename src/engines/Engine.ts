import Renderer from "./Renderer";
import Physics from "./Physics";
import Sound from "./Sound";
interface EngineInterface {
  width: number;
  height: number;
  layers: {
    // Christ, that was hard to figure out! Get the type for the
    // constructor props of the class. [0] was the magic touch
    [key: string]: ConstructorParameters<typeof PIXI.Renderer>[0];
  };
}
class Engine {
  public renderer: Renderer;
  public physics: Physics;
  public sound: Sound;
  constructor(props: EngineInterface) {
    this.renderer = new Renderer(props);
    this.physics = new Physics(props);
    this.sound = new Sound();
  }
}
export default new Engine({
  width: 640,
  height: 640,
  layers: {
    waves: {
      antialias: false,
      resolution: 1,
      backgroundColor: 0x222222,
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
