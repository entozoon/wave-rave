import * as PIXI from "pixi.js"; // shoud be obsolete with v6?!
import Engine from "../engines/Engine";
import { constrain } from "../lib/utils";
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
    const spriteSheetTexture =
      Engine.renderer.pixi.Texture.from(spriteSheet).baseTexture;
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
        restitution: 0, // for oppressed entities (elasticity 0-1)
        friction: 0.001,
        chamfer: { radius: [7, 7, 0, 0] },
        slop: 0.05, // a kind of stickiness, kinda weird
        render: {
          sprite: {
            xOffset: 0.2,
          },
        },
        frictionAir: 0.01, // water friction
        mass: 1000,
        // isStatic: true, obstacles
      }
    );
    Engine.physics.World.add(Engine.physics.world, [this.body]);
    Engine.onUpdate(() => {
      this.update();
    });
  }
  control(key: string) {
    const strengthTurn = 0.00003;
    const strengthForward = 0.02;
    const strengthBackward = 0.01;
    const jet = {
      x: this.body.position.x + (this.height / 2) * -Math.sin(this.body.angle),
      y: this.body.position.y + (this.height / 2) * Math.cos(this.body.angle),
    };
    // console.log("this.body.position.y", this.body.position.y);
    // console.log("jet.y", jet.y);
    // Not sure if I understood these vectors, but it does feel right
    if (key == "left") {
      Engine.physics.Body.applyForce(this.body, jet, {
        x: (this.width / 2) * Math.cos(this.body.angle) * strengthTurn,
        y: (this.width / 2) * Math.sin(this.body.angle) * strengthTurn,
      });
    }
    if (key == "right") {
      Engine.physics.Body.applyForce(this.body, jet, {
        x: (-this.width / 2) * Math.cos(this.body.angle) * strengthTurn,
        y: (-this.width / 2) * Math.sin(this.body.angle) * strengthTurn,
      });
    }
    // Drinking two nights on the trot but I can still just about figure out this trigonometry
    // 17y old me would be proud
    if (key == "up") {
      Engine.physics.Body.applyForce(this.body, jet, {
        // vector between the center of the ship and the jet, factored by a strength
        x: (this.body.position.x - jet.x) * strengthForward,
        y: (this.body.position.y - jet.y) * strengthForward,
      });
    }
    if (key == "down") {
      Engine.physics.Body.applyForce(this.body, jet, {
        x: (jet.x - this.body.position.x) * strengthBackward,
        y: (jet.y - this.body.position.y) * strengthBackward,
      });
    }
  }
  slowAngularRotation() {
    // Reduce turn speed manually, but leave friction at 0 for the sake of frontward floating
    let angularVelocity = this.body.angularVelocity * 0.9;
    // Constrain turn speed too, to prevent mad spinning on collision (works better than I expected)
    angularVelocity = constrain(angularVelocity, -0.1, 0.1);
    Engine.physics.Body.setAngularVelocity(this.body, angularVelocity);
  }
  update() {
    this.slowAngularRotation();
    // Abstract this out to like.. a physics+sprite object?
    this.sprite.position = this.body.position;
    this.sprite.rotation = this.body.angle;
  }
}
