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
    this.body.setSize(256, 8); // physics BB
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
    this.body.setFriction(0.1, 0.1);
  }
}
