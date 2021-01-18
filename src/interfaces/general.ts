export interface Dude {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string | Phaser.Textures.Texture;
  frame?: string | number;
  physicsGroup?: Phaser.Physics.Arcade.Group;
  hero?: boolean;
  input?: Phaser.Input.InputPlugin;
}
export type sceneProps = [any, number, number, string];
