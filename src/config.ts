import sceneLoad from "./scenes/load";
import sceneTest from "./scenes/test";
export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: "Wave Rave",
  width: 640,
  height: 360,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  type: Phaser.WEBGL, // force WEBGL for tints
  parent: "game",
  scene: [sceneLoad, sceneTest],
  input: {
    keyboard: true,
  },
  physics: {
    default: "matter",
    matter: {
      enableSleeping: false, // or things get stuck
      gravity: { x: 0, y: 0 },
      // bear options https://github.com/photonstorm/phaser3-examples/blob/00f84c52b1a27475d5ab2866fdab300a220e6070/public/src/physics/matterjs/debug%20options.js#L74
      // debug: window.location.hostname == "localhost" ? {} : false,
    },
  },
  // backgroundColor: "#101",
  render: {
    // pixelArt: true, // not necessarily good, tough on the ol' eyeholes
    // antialias: false,
    transparent: true,
    clearBeforeRender: false,
  },
};
