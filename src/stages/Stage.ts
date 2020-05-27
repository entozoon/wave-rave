import Pixi from "../engines/Pixi";
import Babe from "../entities/Babe";
export default class Stage {
  constructor() {}
  loop = () => {
    Babe.update();
    Pixi.render();
    requestAnimationFrame(this.loop);
    // return new Promise((resolve, reject) => {
    //   // Pass the resolve into the loop function, to be callbacked
    //   requestAnimationFrame(stageLoop(resolve, reject, this));
    // });
  };
}
