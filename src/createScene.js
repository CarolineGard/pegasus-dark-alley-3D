import * as BABYLON from '@babylonjs/core';
import setupCamera from './game/camera'
import light from './game/light'
import backgroundSphere from './game/skybox'
import Player from './game/player'
import Level from './game/level'


/******* Add the create scene function ******/
var createScene = (engine, canvas) => {
  // Create the scene space
  var scene = new BABYLON.Scene(engine);

  var camera = setupCamera(canvas, scene);
  scene.activeCamera = camera;
  light(scene);
  // Add lights to the scene
  var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
  var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
  // backgroundSphere(scene);
  var level = new Level()
  level.setup(scene);
  var player = new Player();
  player.setup(scene);

  return scene;
};

export default createScene;
