import { width, height } from "../config";
export const constrain = (x: number, a: number, b: number) => {
  return x > b ? b : x < a ? a : x;
};
export const onScreen = ({ x, y }: { x: number; y: number }) => {
  return x > 0 && x < width && y > 0 && y < height;
};
