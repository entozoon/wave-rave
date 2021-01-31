import Engine from "../engines/Engine";
interface JetskiInterface {
  x: number;
  y: number;
  width: number;
  height: number;
}
export default class {
  public sprite: PIXI.Sprite;
  public body: any;
  public width: number;
  public height: number;
  constructor(props: JetskiInterface) {
    this.width = props.width;
    this.height = props.height;
    // Renderer
    const spriteSheet = "/sprites/jetski.png";
    const spriteSheetTexture = Engine.renderer.pixi.Texture.from(spriteSheet)
      .baseTexture;
    const texture = new Engine.renderer.pixi.Texture(spriteSheetTexture);
    this.sprite = new Engine.renderer.pixi.Sprite(texture);
    this.sprite.anchor.set(0.5, 0.5);
    Engine.renderer.layers.main.container.addChild(this.sprite);
    // Physics
    this.body = Engine.physics.Bodies.rectangle(
      props.x,
      props.y,
      props.width,
      props.height,
      {
        restitution: 0.6, // for oppressed entities
        friction: 0,
        chamfer: { radius: [7, 7, 0, 0] }, // 12 is too snappy
        // slop: 0.1, // a kind of stickiness, but weird
        render: {
          sprite: {
            xOffset: 0.2,
          },
        },
        frictionAir: 0.01,
        mass: 1000,
        // isStatic: true, obstacles
      }
    );
    Engine.physics.World.add(Engine.physics.world, [this.body]);
    // Emitter
    // Yeah, check out tankblade for that nonsense. Gonna be in the waves layer
    Engine.onUpdate(() => {
      this.update();
    });
  }
  control(key: string) {
    const jet = {
      x: this.body.position.x + (this.height / 2) * -Math.sin(this.body.angle),
      y: this.body.position.y + (this.height / 2) * Math.cos(this.body.angle),
    };
    // Not sure if I understood these vectors, but it does feel right
    if (key == "left") {
      Engine.physics.Body.applyForce(this.body, jet, {
        x: (this.width / 2) * Math.cos(this.body.angle) * 0.00001,
        y: (this.width / 2) * Math.sin(this.body.angle) * 0.00001,
      });
    }
    if (key == "right") {
      Engine.physics.Body.applyForce(this.body, jet, {
        x: (-this.width / 2) * Math.cos(this.body.angle) * 0.00001,
        y: (-this.width / 2) * Math.sin(this.body.angle) * 0.00001,
      });
    }
    // Drinking two nights on the trot but I can still just about figure out this trigonometry
    // 17y old me would be proud
    if (key == "up") {
      Engine.physics.Body.applyForce(this.body, jet, {
        x: (this.body.position.x - jet.x) * 0.01,
        y: (this.body.position.y - jet.y) * 0.01,
      });
    }
  }
  update() {
    // Abstract this out to like.. a physics+sprite object?
    this.sprite.position = this.body.position;
    this.sprite.rotation = this.body.angle;
  }
}
