import * as BABYLON from "@babylonjs/core";

// Add lights to the scene
var light = scene => {
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  light.intensity = 0.7;

  //   var light3 = new BABYLON.HemisphericLight(
  //     "light1",
  //     new BABYLON.Vector3(1, 1, 0),
  //     scene
  //   );
  //   var light4 = new BABYLON.PointLight(
  //     "light2",
  //     new BABYLON.Vector3(0, 1, -1),
  //     scene
  //   );

  var light1 = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0), // (up, down, specular)
    scene
  );
  light1.intensity = 0.5;
  var light2 = new BABYLON.PointLight(
    "light2",
    new BABYLON.Vector3(0, 20, 0),
    scene
  );
  light2.intensity = 0.3;
};

export default light;
