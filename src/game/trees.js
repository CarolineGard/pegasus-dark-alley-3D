import * as BABYLON from "@babylonjs/core";
import { DEFAULT_MOVING_SPEED } from "./constants";

var Trees = scene => {
  var treeMaterial = new BABYLON.StandardMaterial("material", scene);
  treeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

  var tree = BABYLON.MeshBuilder.CreatePlane(
    "treeLeft",
    { width: 4, height: 250 },
    scene
  );
  tree.setPositionWithLocalVector(new BABYLON.Vector3.Zero());
  tree.material = treeMaterial;

  var leftTrees = [];
  var rightTrees = [];

  // we want to randomly genereate trees with varying width(todo)
  // with a z position along the scene with varying positions between -25 and -35 in x
  for (var i = 0; i < 100; i++) {
    const xPos = Math.floor(Math.random() * 45) + 35;
    const width = Math.floor(Math.random() * 6) + 3;

    let treeLeft = tree.clone();
    treeLeft.setPositionWithLocalVector(new BABYLON.Vector3(-xPos, 5, i * 15));
    treeLeft.width = width;

    let treeRight = tree.clone();
    treeRight.setPositionWithLocalVector(new BABYLON.Vector3(xPos, 5, i * 15));
    treeRight.width = width;

    leftTrees.push(treeLeft);
    rightTrees.push(treeRight);
  }

  // remove clone tree
  tree.dispose();

  scene.registerBeforeRender(() => {
    for (var i = 0; i < 100; i++) {
      rightTrees[i].position.z -= DEFAULT_MOVING_SPEED;
      leftTrees[i].position.z -= DEFAULT_MOVING_SPEED;
    }
  });
};

export default Trees;
