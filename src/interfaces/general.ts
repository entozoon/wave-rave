export interface spriteProps {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string | Phaser.Textures.Texture;
  frame?: string | number;
  physicsGroup?: Phaser.Physics.Arcade.Group;
}
export type sceneProps = [any, number, number, string];
