import Engine from "../engines/Engine";
interface JetskiInterface {
  width: number;
  height: number;
}
export default class {
  public sprite: PIXI.Sprite;
  public body: any;
  constructor(props: JetskiInterface) {
    // Renderer
    // this.sprite = new Engine.renderer.pixi.Graphics();
    // // this.sprite.beginFill(0xde3249);
    // // this.sprite.drawRect(0, 0, props.width, props.height);
    // // this.sprite.endFill();
    const spriteSheet = "/sprites/jetski.png";
    const spriteSheetTexture = Engine.renderer.pixi.Texture.from(spriteSheet)
      .baseTexture;
    const texture = new Engine.renderer.pixi.Texture(
      spriteSheetTexture
      // frame
    );
    this.sprite = new Engine.renderer.pixi.Sprite(texture);
    //   spriteSheet
    // ).baseTexture;
    // this.sprite = new Engine.renderer.pixi.Sprite(
    //   new Pixi.Texture(spriteSheetTexture, 0)
    //   // this.poses[0].frames[0].texture
    // );
    this.sprite.anchor.set(0.5, 0.5);
    Engine.renderer.layers.main.container.addChild(this.sprite);
    // Physics
    this.body = Engine.physics.Bodies.rectangle(
      100,
      100,
      props.width,
      props.height,
      {
        restitution: 0.6,
        friction: 0.1,
        chamfer: { radius: [7, 7, 0, 0] }, // 12 is too snappy
        // slop: 0.1, // a kind of stickiness, but weird
        render: {
          sprite: {
            xOffset: 0.2,
          },
        },
        frictionAir: 0.01,
        mass: 100,
        // isStatic: true, obstacles
      }
    );
    Engine.physics.World.add(Engine.physics.world, [this.body]);
  }
  update() {
    Engine.physics.Body.applyForce(
      this.body,
      { x: this.body.position.x, y: this.body.position.y },
      { x: -0.002, y: -0.06 }
    );
    // Abstract this out to like.. a physics+sprite object?
    this.sprite.position = this.body.position;
    this.sprite.rotation = this.body.angle;
  }
}
