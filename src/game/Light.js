import * as BABYLON from "@babylonjs/core";

// Add lights to the scene
let Light = scene => {
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  let light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 2, -10),
    scene
  );

  light.intensity = 0.7;

  let light1 = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0), // (up, down, specular)
    scene
  );
  light1.intensity = 0.9;
  let light2 = new BABYLON.PointLight(
    "light2",
    new BABYLON.Vector3(Math.PI / 6, 20, 0),
    scene
  );
  light2.intensity = 0.5;
};

export default Light;
