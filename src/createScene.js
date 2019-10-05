import * as BABYLON from "@babylonjs/core";
import setupCamera from "./game/camera";
import light from "./game/light";
import SkyBox from "./game/skybox";
import Player from "./game/player";
import Level from "./game/level";

/******* Add the create scene function ******/
var createScene = (engine, canvas) => {
  // Create the scene space
  var scene = new BABYLON.Scene(engine);

  var camera = setupCamera(canvas, scene);
  scene.activeCamera = camera;
  light(scene);

  SkyBox(scene);
  var level = new Level();
  level.setup(scene);
  var player = new Player();
  player.setup(scene);

  return scene;
};

export default createScene;
