///<reference path="Controllable.d.ts"/>
import Engine from "../engines/Engine";
const getTouchPos = (canvas, e) => {
  // Grab the scale because, the bloody transforms don't get factored in
  // const scale = Math.round(canvas.getBoundingClientRect().width / 64);
  // return {
  //   x: (e.touches[0].clientX - canvas.getBoundingClientRect().left) / scale,
  //   y: (e.touches[0].clientY - canvas.getBoundingClientRect().top) / scale,
  // };
  window.alert("No touch algorithm yet");
  return { x: 0, y: 0 };
};
const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value);
const directionKeycodeFromTouchPos = ({ x, y, width, height, keyCodes }) => {
  // Must improved rewrite, with advice from https://gist.github.com/fbacall
  let keyCode = "none";
  const relX = x - width / 2;
  const relY = y - height / 2;
  if (Math.abs(relY) > Math.abs(relX)) {
    keyCode = relY < 0 ? "up" : "down";
  } else {
    keyCode = relX > 0 ? "right" : "left";
  }
  return getKeyByValue(keyCodes, keyCode);
};
export default class {
  private keyCodes: {};
  private keyMatrix: KeyMatrix = {};
  private hero: any;
  constructor({ hero }) {
    const { width, height } = Engine;
    this.hero = hero;
    this.keyCodes = {
      38: "up",
      87: "up",
      40: "down",
      83: "down",
      37: "left",
      65: "left",
      39: "right",
      68: "right",
      32: "space",
    };
    // this.keyMatrix = [...new Set(Object.values(this.keyCodes))]; // nah, cope undefines innit
    document.addEventListener("keydown", (e) => {
      this.keypress(e);
    });
    document.addEventListener("keyup", (e) => {
      this.keypress(e);
    });
    // Simulate keypress style events for touchscreens
    // (UNTESTED)
    const canvas = Engine.renderer.layers.main.renderer.view;
    // ^ officially the most ridiculous depth
    canvas.addEventListener("touchstart", (e) => {
      let keyEventSim = {
        type: "keydown",
        keyCode: directionKeycodeFromTouchPos({
          ...getTouchPos(canvas, e),
          width,
          height,
          keyCodes: this.keyCodes,
        }),
        preventDefault: () => {},
      };
      this.keypress(keyEventSim);
    });
    // Might have to re-write this to store relationship between start and stop..
    canvas.addEventListener("touchend", (e) => {
      // Sack off all keypressed events
      for (let i in this.keyMatrix) {
        this.keyMatrix[i] = false;
      }
    });
    Engine.onUpdate(() => {
      this.update();
    });
  }
  update() {
    // console.log("controllable update..", this);
    // how to control the ship... I've passed through this.hero.body shit
    // if (this.keyMatrix?.up) {
    //   this.hero.up();
    // }
    for (let key in this.keyMatrix) {
      // console.log(this.hero);
      if (this.hero?.control && this.keyMatrix[key]) {
        this.hero.control(key);
      }
    }
    // this.setThrust({
    //   x: this.keyMatrix.left
    //     ? -this.thrustPower
    //     : this.keyMatrix.right
    //     ? this.thrustPower
    //     : 0,
    //   y: this.keyMatrix.up
    //     ? -this.thrustPower
    //     : this.keyMatrix.down
    //     ? this.thrustPower
    //     : 0,
    // });
  }
  keypress(e) {
    if (this.keyCodes[e.keyCode]) {
      e.preventDefault();
      if (this.keyMatrix[this.keyCodes[e.keyCode]] !== (e.type === "keydown")) {
        this.keyMatrix[this.keyCodes[e.keyCode]] = e.type === "keydown";
        // Significant interaction moment. Don't.. don't worry about ^this code; hard braindump
        // console.log(this.keyMatrix);
      }
    }
  }
}
