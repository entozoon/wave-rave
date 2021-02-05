export const constrain = (x: number, a: number, b: number) => {
  return x > b ? b : x < a ? a : x;
};
