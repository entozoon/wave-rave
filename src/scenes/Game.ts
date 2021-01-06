import "phaser";

import { height, width } from "../config";
//
export default class Demo extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  preload() {
    this.load.image("logo", "assets/phaser3-logo.png");
  }
  create() {
    const logo = this.add.image(width / 2, 0, "logo");
    logo.width = 30;
    logo.setScale(0.5);
    this.tweens.add({
      targets: logo,
      y: height,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }
}
