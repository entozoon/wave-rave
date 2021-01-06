import Dude from "../objects/dude";
export default class extends Phaser.Scene {
  private dudes: Phaser.GameObjects.Group;
  constructor() {
    super("sceneTest");
  }
  preload() {
    this.load.image("logo", "./assets/sprites/mario.png");
  }
  create() {
    const logo = this.add.image(400, 70, "logo");
    const blob = this.add.graphics();
    blob.fillStyle(0xff0000, 0.8);
    blob.fillCircle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      30
    );
    this.tweens.add({
      targets: blob,
      y: this.cameras.main.height / 2 - 30,
      duration: 1000,
      ease: "Sine.in",
      yoyo: true,
      repeat: -1,
    });
    this.dudes = this.add.group({
      runChildUpdate: true,
    });
    this.dudes.add(
      new Dude({
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
