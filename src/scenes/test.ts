import { Test } from "../objects/test";
export default class extends Phaser.Scene {
  private boxes: Phaser.GameObjects.Group;
  constructor() {
    super("TestScene");
  }
  preload() {
    this.load.image("logo", "./assets/sprites/mario.png");
  }
  create() {
    const logo = this.add.image(400, 70, "logo");
    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    var graphics = this.add.graphics();
    graphics.lineStyle(4, 0x00ff00, 1);
    graphics.strokeRect(32, 32, 256, 256);
    graphics.fillStyle(0xff0000, 0.8);
    graphics.fillCircle(260, 260, 120);
    graphics.lineStyle(4, 0xff00ff, 1);
    graphics.strokeEllipse(400, 300, 200, 128);

    this.boxes = this.add.group({
      runChildUpdate: true,
    });
    this.boxes.add(
      new Test({
        scene: this,
        // content: object.properties.content,
        x: 10,
        y: 10,
        texture: "logo",
      })
      // new Test(
      //   this,
      //   // content: object.properties.content,
      //   10,
      //   10,
      //   "logo"
      // )
    );
  }
}
