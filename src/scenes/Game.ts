//
// HINTS:
// https://github.com/digitsensitive/phaser3-typescript/tree/master/src/games
//
import "phaser";

import { height, width } from "../config";

import { ISpriteConstructor } from "../interfaces/sprite.interface";

class Jetski extends Phaser.GameObjects.Sprite {
  constructor(aParams: ISpriteConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
    // this.foo = "hello";
    // this.add.image(10, 10, "logo");
  }
  update(): void {}
}
export default class extends Phaser.Scene {
  baddies = [];
  constructor() {
    super("GameScene");
  }
  preload() {
    this.load.image("logo", "assets/phaser3-logo.png");
  }
  create() {
    // this.baddies.push(new Jetski());
    this.baddies.push(
      this.add.existing(new Jetski(this, 240, 290, "walk", "southEast", 100))
    );
  }
}
