import * as BABYLON from "@babylonjs/core";
import setupCamera from "./game/camera";
import Light from "./game/light";
import SkyBox from "./game/skybox";
import Player from "./game/player";
import Level from "./game/level";
import sceneEffects from "./game/sceneEffects";
import Trees from "./game/trees";
import gui from "./game/gui";

/******* Add the create scene function ******/
var createScene = (engine, canvas) => {
  // Create the scene space
  var scene = new BABYLON.Scene(engine);

  var camera = setupCamera(canvas, scene);
  scene.activeCamera = camera;
  Light(scene);

  SkyBox(scene);
  var level = new Level();
  level.setup(scene);

  sceneEffects(scene);
  Trees(scene);

  var player = new Player();
  player.setup(scene);
  gui(scene, player)

  return scene;
};

export default createScene;
