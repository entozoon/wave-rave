import Pixi from "./engines/Pixi";
import { test } from "./stages/test";
// Let there be firmaments, sound etc
const game = async () => {
  await Pixi.create();
  await test();
};
game();
// Nag Safari users, as it straight up doesn't render well enough
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("safari") != -1 && ua.indexOf("chrome") <= -1) {
  alert(
    "Please use Chrome if possible, as the pixel rendering gets blurred on Safari."
  );
}
