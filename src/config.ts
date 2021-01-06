import "phaser";

export const width = 320;
export const height = 240;
export default {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#000",
  pixelArt: true,
  scale: {
    width,
    height,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: { debug: true },
  },
};
