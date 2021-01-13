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
  type: Phaser.AUTO,
  parent: "game",
  scene: [sceneLoad, sceneTest],
  input: {
    keyboard: true,
  },
  physics: {
    default: "matter",
    matter: {
      enableSleeping: true,
      gravity: { x: 0, y: 0 },
      // comment to remove. bear options https://github.com/photonstorm/phaser3-examples/blob/00f84c52b1a27475d5ab2866fdab300a220e6070/public/src/physics/matterjs/debug%20options.js#L74
      debug: {},
    },
  },
  backgroundColor: "#111",
  render: {
    pixelArt: true, // not necessarily good, tough on the ol' eyeholes
    antialias: false,
  },
};
