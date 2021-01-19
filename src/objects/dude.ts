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
    this.physics = this.matter.add.sprite(props.x, props.y, "dude", null, {
      isStatic: false, // !
    });
    this.physics.setRectangle(18, 32, {
      // https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Matter.html#.MatterBodyConfig
      // You an also handcraft physics shapes
      // vertices: [
      //   { x: 0, y: 0 },
      //   { x: 32, y: 0 },
      //   { x: 32, y: -32 },
      //   { x: 0, y: -32 },
      // ],
      chamfer: { radius: [7, 7, 0, 0] }, // 12 is too snappy
      // slop: 0.1, // a kind of stickiness, but weird
      render: {
        sprite: {
          xOffset: 0.2,
        },
      },
      friction: 0, // when colliding - none or we get spinny
      frictionAir: 0.01,
      mass: 100,
    });
    this.physics.setBounce(0.1); // doesn't seem to affect the world bounds
    // You can actually tint specific pixels with setTintFill, if needed. Perhaps for flashing
    const guff1 = Math.random();
    const guff2 = Math.random();
    this.physics.setTint(
      0xff0000 * guff1,
      0xff0000 * guff1,
      0x0000ff * guff2,
      0x0000ff * guff2
    );
    // HACK **
    this.matter.world.setBounds(
      0,
      0,
      this.parentScene.cameras.main.width,
      this.parentScene.cameras.main.height
    );
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
            // I love it when some things are radians and others degrees, not.
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
    // console.log(this.physics.body); // infinite info
    if (
      this.cursors &&
      "angularVelocity" in this.physics.body &&
      "speed" in this.physics.body
    ) {
      // if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.cursors.up.isDown) {
        this.physics.thrustLeft(0.04);
      }
      if (this.cursors.down.isDown) {
        this.physics.thrustRight(0.005);
      }
      const turningStrength =
        1 - Phaser.Math.Clamp(this.physics.body.speed, 0, 10) / 10;
      if (this.cursors.left.isDown) {
        // If I'm clever about it, frictionAir will take care of max speeds
        // applyForceFrom is also a thing:
        // https://github.com/photonstorm/phaser3-examples/blob/master/public/src/physics/matterjs/top%20down%20car%20body.js
        this.physics.setAngularVelocity(
          this.physics.body.angularVelocity - 0.005 * turningStrength
        );
        // Arg, the thing with apply force from is that the origin is X/Y
        // and I don't wanna angle around it but could work for jump obstacles
        // this.physics.applyForceFrom(
        //   new Phaser.Math.Vector2({
        //     x: this.physics.body.position.x - 16,
        //     y: this.physics.body.position.y + 32,
        //   }),
        //   new Phaser.Math.Vector2({ x: 0.0001, y: 0 })
        // );
      }
      if (this.cursors.right.isDown) {
        this.physics.setAngularVelocity(
          this.physics.body.angularVelocity + 0.005 * turningStrength
        );
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
