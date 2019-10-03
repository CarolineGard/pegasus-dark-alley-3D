import * as BABYLON from '@babylonjs/core';
import * as cannon from 'cannon';
import camera from './game/camera'
import light from './game/light'
import backgroundSphere from './game/skybox'
import player from './game/player'


/******* Add the create scene function ******/
var createScene = (engine, canvas) => {
  // Create the scene space
  var scene = new BABYLON.Scene(engine);

  camera(canvas, scene);
  light(scene);
  backgroundSphere(scene);
  level(scene);
  player(scene);

  return scene;
};

export default createScene;
