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
        // isStatic: true, obstacles
      }
    );
    Engine.physics.World.add(Engine.physics.world, [this.body]);
  }
  update() {
    this.sprite.position = this.body.position;
    this.sprite.rotation = this.body.angle;
  }
}
