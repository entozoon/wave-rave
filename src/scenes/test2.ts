export default class extends Phaser.Scene {
  graphics: any;
  circles: any;
  create = () => {
    this.graphics = this.add.graphics({ lineStyle: { color: 0x00ff00 } });
    var circle = new Phaser.Geom.Circle(400, 300, 0);
    this.circles = [circle];
    for (var i = 0; i < 80; i++) {
      circle = Phaser.Geom.Circle.Clone(circle);
      circle.radius += 1;
      Phaser.Geom.Circle.CircumferencePoint(
        circle,
        (i / 20) * Phaser.Math.PI2,
        circle
      );
      this.circles.push(circle);
    }
  };
  update = () => {
    // graphics.clear();
    for (var i = 0; i < this.circles.length; i++) {
      this.circles[i].radius += 1;
      if (this.circles[i].radius > 800) {
        this.circles[i].radius = 0;
      }
      this.graphics.strokeCircleShape(this.circles[i]);
    }
  };
}
