import { sceneProps } from "../interfaces/general";
export default class extends Phaser.GameObjects.Sprite {
  parentScene: any;
  sprite: any;
  constructor(props: any) {
    super(...(Object.values(props) as sceneProps));
    this.parentScene = props.scene;
    // this.sprite = this.parentScene.add.sprite(32, 32, "dude");
    this.setTexture("dude");
    this.setPosition(100, 100);
    // setInterval(() => {
    //   this.update();
    // }, 100);
  }
  private initSprite(): void {
    // this.setOrigin(0, 0);
    // this.setFrame(0);
    // this.parentScene.physics.world.enable(this);
    // this.body.setSize(256, 8); // physics BB
    // this.body.setAllowGravity(false);
    // this.body.setImmovable(true);
    // this.body.setFriction(0.1, 0.1);
    // this.matter.add.rectangle(750, 200, 16, 180, { isStatic: true });
    // ground.setFriction(0.005);
  }
  preUpdate = (time, delta) => {
    super.preUpdate(time, delta);

    this.rotation += 0.01;
  };
  update = () => {
    this.sprite.x += 0.1;
  };
}
