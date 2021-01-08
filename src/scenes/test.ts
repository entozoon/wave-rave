import Dude from "../objects/dude";
import Floor from "../objects/floor";
export default class extends Phaser.Scene {
  private dudes: Phaser.GameObjects.Group;
  private floor: Phaser.GameObjects.Group;
  constructor() {
    super("sceneTest");
  }
  create() {
    const blob = this.add.graphics();
    blob.fillStyle(0xff0000, 0.8);
    blob.fillCircle(this.cameras.main.width / 2, 30, 30);
    this.tweens.add({
      targets: blob,
      x: this.cameras.main.height / 2 - 30,
      duration: 1000,
      ease: "Sine.in",
      yoyo: true,
      repeat: -1,
    });
    // const physicsGroup = this.physics.add.group({
    //   key: "stuff",
    //   frameQuantity: 12,
    //   maxSize: 12,
    //   active: false,
    //   visible: false,
    //   enable: false,
    //   collideWorldBounds: true,
    //   bounceX: 0.5,
    //   bounceY: 0.5,
    //   dragX: 30,
    //   dragY: 0,
    // });
    this.dudes = this.add.group({
      runChildUpdate: true,
    });
    for (let i = 0; i < 1; i++) {
      this.dudes.add(
        new Dude({
          scene: this,
          // content: object.properties.content,
          x: i * 35 + 50,
          y: 10,
          texture: "dude",
        })
      );
    }
    // Probably doesn't need to be in a group but yeah
    this.floor = this.add.group();
    this.floor.add(
      new Floor({
        scene: this,
        // content: object.properties.content,
        x: this.cameras.main.width / 2,
        y: this.cameras.main.height - 40,
        texture: "floor",
      })
    );
    this.physics.add.collider(this.dudes, this.floor, (_player, _platform) => {
      // console.log("[Collision: floor]");
    });
    this.physics.add.collider(this.dudes, this.dudes, (_player, _platform) => {
      // console.log("[Collision: floor]");
    });
  }
}
