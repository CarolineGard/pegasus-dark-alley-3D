import * as BABYLON from "@babylonjs/core";

const Camera = (canvas, scene) => {
  // Add a camera to the scene and attach it to the canvas
  let camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    Math.PI / 2.4,
    20,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.setPosition(new BABYLON.Vector3(0, 50, 0));
  camera.lowerAlphaLimit = -Math.PI / 2;
  camera.upperAlphaLimit = -Math.PI / 2;
  camera.lowerBetaLimit = Math.PI / 2.2;
  camera.upperBetaLimit = Math.PI / 2.2;

  camera.maxZ = 2000;

  camera.attachControl(canvas, true);
  return camera;
};

export default Camera;
