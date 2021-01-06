import sceneLoad from "./scenes/load";
import sceneTest from "./scenes/test";
export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: "Wave Rave",
  width: 320,
  height: 200,
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
    default: "arcade",
    arcade: {
      gravity: { y: 475 },
      debug: true,
    },
  },
  backgroundColor: "#111",
  render: { pixelArt: true, antialias: false },
};
