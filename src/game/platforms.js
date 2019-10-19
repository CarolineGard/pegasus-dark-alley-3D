import * as BABYLON from "@babylonjs/core";

var Platform = scene => {
  var platformMaterial = new BABYLON.StandardMaterial(
    "platformMaterial",
    scene
  );
  platformMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

  const randomNr = Math.floor(Math.random() * 5);
  //   switch (randomNr) {
  //     case "1":
  //       platformType1(scene, platformMaterial);
  //       break;
  //     default:
  //       platformType1(scene, platformMaterial);
  //       break;
  //   }
  platformType1(scene, platformMaterial);
};

var platformType1 = (scene, platformMaterial) => {};
// var platformType2 = scene => {

// };
// var platformType3 = scene => {

// };
// var platformType4 = scene => {

// };
// var platformType5 = scene => {

// };

export default Platform;
