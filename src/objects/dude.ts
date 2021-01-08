import { spriteProps, sceneProps } from "../interfaces/general";
export default class extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  private parentScene: Phaser.Scene;
  protected destroyingValue: number;
  constructor(props: spriteProps) {
    super(...(Object.values(props) as sceneProps));
    this.parentScene = props.scene;
    this.initSprite();
    this.parentScene.add.existing(this);
  }
  private initSprite(): void {
    this.setOrigin(0, 0);
    this.setFrame(0);
    this.parentScene.physics.world.enable(this);
    this.body.setSize(32, 32); // physics BB
    this.body.setAllowGravity(true);
    this.body.setImmovable(false);
    this.body.setBounce(0.5, Math.random());
    this.body.setAllowRotation(true);
    this.body.setCircle(16);
    this.body.setFriction(0.1, 0.1);
    // this.body.setVelocityX(Math.random() * 10 - 5);
    this.body.setVelocityX(20);
    // Phaser.Actions.RotateAroundDistance(this.body, { x: 0, y: 0 }, 90, 0);
  }
  update(): void {
    if (this.body.touching.down) {
      // console.log("[Dude touching down]");
      // Remove it
      // this.destroy();
      // Add points into global registry
      // this.parentScene.registry.values.score += 1;
      // Emit events, etc
      // this.parentScene.events.emit("scoreChanged");
      // console.log(this.body.angle);
    }
    this.setRotation(-this.body.angle);
  }
}
