// import { AnimationHelper } from "../helpers/animation-helper";
export default class extends Phaser.Scene {
  // private animationHelperInstance: AnimationHelper;
  private loadingSpinner: Phaser.GameObjects.Graphics;

  preload(): void {
    this.cameras.main.setBackgroundColor(0xff00ff);
    this.loadingSpinner = this.add.graphics();
    this.loadingSpinner.fillStyle(0x000000, 1);
    this.loadingSpinner.fillCircle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      Math.sqrt(
        Math.pow(this.cameras.main.height, 2) +
          Math.pow(this.cameras.main.width, 2)
      )
    );
    this.loadingSpinner.setScale(0);
    this.load.on(
      "progress",
      (value: number) => {
        this.loadingSpinner.setScale(value);
      },
      this
    );
    this.load.on(
      "complete",
      function () {
        // this.animationHelperInstance = new AnimationHelper(
        //   this,
        //   this.cache.json.get("animationJSON")
        // );
        this.loadingSpinner.destroy();
      },
      this
    );
    // this.load.pack("preload", "./assets/pack.json", "preload");
    this.load.image("dude", "./assets/sprites/dude.png");
    this.load.image("floor", "./assets/sprites/floor.png");
  }
  update(): void {
    this.scene.start("sceneTest");
  }
}
