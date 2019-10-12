import * as BABYLON from "@babylonjs/core";
import { DEFAULT_MOVING_SPEED } from './constants'

var Trees = scene => {
  var treeMaterial = new BABYLON.StandardMaterial("material", scene);
  treeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

  var leftTrees = [];
  var rightTrees = [];

  // we want to randomly genereate trees with varying width(todo)
  // with a z position along the scene with varying positions between -25 and -35 in x
  for (var i = 0; i < 100; i++) {
    const xPos = Math.floor(Math.random() * 45) + 35;
    const width = Math.floor(Math.random() * 6) + 3;

    var treeLeft = BABYLON.MeshBuilder.CreatePlane(
      "treeLeft",
      { width: width, height: 250, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
      scene
    );
    treeLeft.setPositionWithLocalVector(new BABYLON.Vector3(-xPos, 5, i * 15));
    treeLeft.material = treeMaterial;

    var treeRight = BABYLON.MeshBuilder.CreatePlane(
      "treeRight",
      { width: width, height: 250, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
      scene
    );
    treeRight.setPositionWithLocalVector(new BABYLON.Vector3(xPos, 5, i * 7));
    treeRight.material = treeMaterial;

    leftTrees.push(treeLeft);
    rightTrees.push(treeRight);
  }

  scene.registerBeforeRender(() => {
    for (var i = 0; i < 100; i++) {
      rightTrees[i].position.z -= DEFAULT_MOVING_SPEED
      leftTrees[i].position.z -= DEFAULT_MOVING_SPEED
    }
  });
}

export default Trees;
