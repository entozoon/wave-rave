import { Dude, sceneProps } from "../interfaces/general";
export default class extends Phaser.GameObjects.Sprite {
  private parentScene: Phaser.Scene;
  private matter: Phaser.Physics.Matter.MatterPhysics;
  // private physics: MatterJS.BodyType;
  private physics: Phaser.Physics.Matter.Image;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private props: any;
  private jet: any;
  constructor(props: Dude) {
    super(...(Object.values(props) as sceneProps));
    this.parentScene = props.scene;
    this.matter = props.scene.matter;
    this.props = props;
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
    this.physics.setStatic(false); // !!
    this.physics.setRectangle(32, 32, {
      chamfer: { radius: [12, 12, 0, 0] },
    });
    // this.physics.add.rectangle(200, 200, 100, 100, {
    //   chamfer: { radius: 20 },
    // });
    // this.matter.add.polygon(100, 500, 8, 50);
    this.physics.setVelocity(0.5, 1);
    // this.physics.setAngularVelocity(0.1);
    this.physics.setFriction(0.5); // when colliding(?)
    this.physics.setFrictionAir(0.01);
    this.physics.setMass(40);
    // HACK **
    this.matter.world.setBounds(
      0,
      0,
      this.parentScene.cameras.main.width,
      this.parentScene.cameras.main.height
    );
    // this.matter.add.trapezoid();
    // this.physics = this.matter.add.circle(this.x, this.y, 16);
    const particles = this.parentScene.add.particles("jet");
    this.jet = particles.createEmitter({
      x: {
        onEmit: () => {
          if ("angle" in this.physics.body) {
            return (
              this.physics.body.position.x -
              (Math.sin(this.physics.body.angle) * this.width) / 2
            );
          }
        },
      },
      y: {
        onEmit: () => {
          if ("angle" in this.physics.body) {
            return (
              this.physics.body.position.y +
              (Math.cos(this.physics.body.angle) * this.width) / 2
            );
          }
        },
      },
      // followOffset: { x: -30 },
      // follow: this.physics,
      // frame: "blue",
      // speed: 10,
      // lifespan: 10,
      // alpha: 1,
      // speed: { min: 400, max: 600 },
      speed: {
        onEmit: () => {
          if ("speed" in this.physics.body) {
            // I don't think this is doing what I think it's doing, but it's fantastic!
            return -this.physics.body.speed * 30;
          }
        },
      },
      lifespan: 2000,
      rotate: {
        onEmit: () => {
          if ("angle" in this.physics.body) {
            // if (Math.random() > 0.999) {
            //   console.log(this.physics.body.angle);
            // }
            // I love it when some things are radians and others degrees
            return 360 * (this.physics.body.angle / (Math.PI * 2));
          }
        },
      },
      alpha: { start: 1.0, end: 0 },
      scale: { start: 0, end: 1 },
      frequency: 10, // higher is lower, default 0
      blendMode: "ADD",
    });
    if (props.hero) {
      this.cursors = props.input.keyboard.createCursorKeys();
    }
  }
  update(): void {
    if (this.cursors) {
      // if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.cursors.up.isDown) {
        // console.log(this.physics.isStatic());
        // if ("speed" in this.physics.body) {
        //   console.log(this.physics.body.speed);
        // }
        // console.log(this.physics.body); // infinite info
        this.physics.thrustLeft(0.02); // not limitless, because air friction
        // this.physics.setVelocityX(1);
        // gonna have to handle acceleration myself,
        // and probably even X/Y velocities. fuck sake
      }
      if (this.cursors.left.isDown) {
        this.physics.setAngularVelocity(-0.05);
      }
      if (this.cursors.right.isDown) {
        this.physics.setAngularVelocity(0.05);
      }
    }
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
