export interface sceneProps {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string | Phaser.Textures.Texture;
  frame?: string | number;
}
export type scenePropsValues = [any, number, number, string];
