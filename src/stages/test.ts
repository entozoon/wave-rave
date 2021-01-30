import Engine from "../engines/Engine";
import Jetski from "../entities/Jetski";
import Controllable from "../behaviours/Controllable";
export const test = () => {
  let jetskis = [];
  jetskis.push(
    new Jetski({
      x: 100,
      y: 100,
      width: 20,
      height: 30,
    })
  );
  const hero = new Jetski({
    x: 200,
    y: 200,
    width: 20,
    height: 30,
  });
  Object.assign(hero, new Controllable({ parent: hero }));
  jetskis.push(hero);
  // Ideally I wanna be currying in the hero favours rather than in the entity

  // floor test
  const floor = Engine.physics.Bodies.rectangle(400, 300, 1200, 50.5, {
    isStatic: true,
    render: { fillStyle: "#060a19" },
    angle: 0.1,
  });
  Engine.physics.World.add(Engine.physics.world, [floor]);
};
