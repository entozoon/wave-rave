import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { HUDScene } from "./scenes/hud-scene";
import { MenuScene } from "./scenes/menu-scene";
import TestScene from "./scenes/test";
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
  // scene: [BootScene, TestScene],
  scene: [TestScene],
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
