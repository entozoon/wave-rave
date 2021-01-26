import Engine from "../engines/Engine";
import Jetski from "../entities/Jetski";
export const test = () => {
  let jetskis = [];
  jetskis.push(new Jetski({ width: 20, height: 30 }));
  // Ideally I wanna be currying in the hero behaviours rather than in the entity

  // floor test
  const floor = Engine.physics.Bodies.rectangle(400, 300, 1200, 50.5, {
    isStatic: true,
    render: { fillStyle: "#060a19" },
    angle: 0.1,
  });
  Engine.physics.World.add(Engine.physics.world, [floor]);
};
