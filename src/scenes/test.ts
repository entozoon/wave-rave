import Dude from "../objects/dude";
import Delete from "../objects/delete";
// import Floor from "../objects/floor";
export default class extends Phaser.Scene {
  private dudes: Phaser.GameObjects.Group;
  private deletes: Phaser.GameObjects.Group;
  private del: any;
  graphics: any;
  circle: any;
  circles: any;
  // private floor: Phaser.GameObjects.Group;
  constructor() {
    super("sceneTest");
  }
  create() {
    this.graphics = this.add.graphics({ lineStyle: { color: 0x00ff00 } });
    this.circle = new Phaser.Geom.Circle(400, 300, 20);
    this.graphics.strokeCircleShape(this.circle);
    // var circle = new Phaser.Geom.Circle(400, 300, 0);
    // this.circles = [circle];
    // for (var i = 0; i < 80; i++) {
    //   circle = Phaser.Geom.Circle.Clone(circle);
    //   circle.radius += 1;
    //   Phaser.Geom.Circle.CircumferencePoint(
    //     circle,
    //     (i / 20) * Phaser.Math.PI2,
    //     circle
    //   );
    //   this.circles.push(circle);
    // }
    // let image = this.add.image(
    //   this.cameras.main.width,
    //   this.cameras.main.height,
    //   "dude"
    // );
    // image.setScale(100).setScrollFactor(0);
    // const blob = this.add.graphics();
    // blob.fillStyle(0xff0000, 0.8);
    // blob.fillCircle(this.cameras.main.width / 2, 30, 30);
    // this.tweens.add({
    //   targets: blob,
    //   x: this.cameras.main.height / 2 - 30,
    //   duration: 1000,
    //   ease: "Sine.in",
    //   yoyo: true,
    //   repeat: -1,
    // });
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
      // scene: ..
    });
    // for (let i = 0; i < 2; i++) {
    //   this.dudes.add(
    //     new Dude({
    //       scene: this,
    //       // content: object.properties.content,
    //       x: i * 35 + 50,
    //       y: 10,
    //       texture: "dude",
    //     })
    //   );
    // }
    // this.dudes.add(
    //   new Dude({
    //     scene: this,
    //     // content: object.properties.content,
    //     x: this.cameras.main.width / 2,
    //     y: this.cameras.main.height / 2,
    //     texture: "dude",
    //     hero: true,
    //     input: this.input,
    //   })
    // )}
    this.deletes = this.add.group({
      runChildUpdate: true,
    });
    // this.deletes.add(
    //   new Delete({
    //     scene: this,
    //     x: this.cameras.main.width / 2,
    //     y: this.cameras.main.height / 2,
    //     texture: "dude",
    //   })
    // );
    this.del = new Delete({
      scene: this,
      x: this.cameras.main.width / 2,
      y: this.cameras.main.height / 2,
      texture: "dude",
      runChildUpdate: true,
      update: true,
    });
    this.add.existing(this.del);
    //
    const particles = this.add.particles("oof");
    const dwa = particles.createEmitter({
      x: 110,
      y: 110,
      speed: 100,
      lifespan: 2000,
      alpha: { start: 1.0, end: 0 },
      scale: { start: 0, end: 1 },
      frequency: 10, // higher is lower, default 0
    });
  }
  update = () => {
    // this.graphics.clear();
    // if (Math.random() > 0.99) {
    //   for (var i = 0; i < this.circles.length; i++) {
    //     this.circles[i].radius += 1;
    //     if (this.circles[i].radius > 800) {
    //       this.circles[i].radius = 0;
    //     }
    //     this.graphics.strokeCircleShape(this.circles[i]);
    //   }
    // this.del.sprite.y += 0.1;
    // }
    this.circle.x += 0.2;
    // this.circle.position.x += 0.2;
    this.circle.radius += 2;
    this.graphics.strokeCircleShape(this.circle);
  };
}
