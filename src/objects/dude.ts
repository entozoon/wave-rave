import { spriteProps, sceneProps } from "../interfaces/general";
export default class extends Phaser.GameObjects.Sprite {
  private parentScene: Phaser.Scene;
  private matter: Phaser.Physics.Matter.MatterPhysics;
  // private physics: MatterJS.BodyType;
  private physics: Phaser.Physics.Matter.Image;
  constructor(props: spriteProps) {
    super(...(Object.values(props) as sceneProps));
    this.parentScene = props.scene;
    this.matter = props.scene.matter;
    // this.parentScene.add.existing(this);
    // this.setOrigin(0, 0);
    // this.setFrame(0);
    // this.parentScene.physics.world.enable(this);
    // this.body.setSize(32, 32); // physics BB
    // this.body.setAllowGravity(true);
    // this.body.setImmovable(false);
    // this.body.setBounce(0.5, Math.random());
    // this.body.setAllowRotation(true);
    // this.body.setCircle(16);
    // this.body.setFriction(0.1, 0.1);
    // // this.body.setVelocityX(Math.random() * 10 - 5);
    // this.body.setVelocityX(20);
    // Phaser.Actions.RotateAroundDistance(this.body, { x: 0, y: 0 }, 90, 0);
    this.physics = this.matter.add.image(32, 32, "dude");
    // this.physics.setCircle(32);
    // this.physics.setTrapezoid(16, 16, 2);
    this.physics.setRectangle(32, 32, {
      chamfer: { radius: [12, 12, 0, 0] },
    });
    // this.physics.add.rectangle(200, 200, 100, 100, {
    //   chamfer: { radius: 20 },
    // });
    // this.matter.add.polygon(100, 500, 8, 50);
    this.physics.setVelocity(0.5, 1);
    this.physics.setAngularVelocity(0.1);
    this.physics.setFriction(0.005);

    // this.matter.add.trapezoid();
    // this.physics = this.matter.add.circle(this.x, this.y, 16);
  }
  update(): void {
    // if (this.body.touching.down) {
    //   // console.log("[Dude touching down]");
    //   // Remove it
    //   // this.destroy();
    //   // Add points into global registry
    //   // this.parentScene.registry.values.score += 1;
    //   // Emit events, etc
    //   // this.parentScene.events.emit("scoreChanged");
    //   // console.log(this.body.angle);
    // }
    // this.setRotation(-this.body.angle);
  }
}
