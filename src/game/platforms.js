import * as BABYLON from "@babylonjs/core";

var Platform = scene => {
  var platformMaterial = new BABYLON.StandardMaterial(
    "platformMaterial",
    scene
  );
  platformMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

  const randomNr = Math.floor(Math.random() * 5);

  platformType1(scene, platformMaterial);
};

var platformType1 = (scene, platformMaterial) => {};

export default Platform;
