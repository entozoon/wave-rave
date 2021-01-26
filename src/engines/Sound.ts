import pixiSound from "pixi-sound";
export default class {
  public sound: typeof pixiSound;
  constructor() {
    this.sound = pixiSound;
  }
}
