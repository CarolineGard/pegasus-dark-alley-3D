import * as BABYLON from "@babylonjs/core";
import Camera from "./game/Camera";
import Light from "./game/Light";
import Player from "./game/Player";
import Level from "./game/Level";

/******* Add the create scene function ******/
const CreateScene = (engine, canvas) => {
  let scene = new BABYLON.Scene(engine);

  let camera = Camera(canvas, scene);
  scene.activeCamera = camera;
  Light(scene);

  let level = new Level();
  level.setup(scene);

  let player = new Player();
  player.setup(scene);

  scene.registerBeforeRender(() => {
    if (level.getPlane().intersectsMesh(player.getPlayer(), false)) {
      player.getPlayer().physicsImpostor.forceUpdate();
      console.log("INTERSECT");
    }

  //   player.getPlayer().physicsImpostor.registerOnPhysicsCollide(level.getPlane().physicsImpostor, function(main, collided) {
	//     console.log("COLLISION YO");
	// });

    // player.getPlayer().physicsImpostor.forceUpdate()
  });

  return scene;
};

export default CreateScene;
