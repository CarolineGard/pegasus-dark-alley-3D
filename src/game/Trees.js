import * as BABYLON from "@babylonjs/core";

import { DEFAULT_MOVING_SPEED } from "./constants";

class Trees {
  constructor() {
    this.leftTrees = [];
    this.rightTrees = [];
  }

  setup(scene) {
    this.leftTrees = [];
    this.rightTrees = [];

    let treeMaterial = new BABYLON.StandardMaterial("material", scene);
    treeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    let tree = BABYLON.MeshBuilder.CreatePlane(
      "treeLeft",
      { width: 4, height: 250 },
      scene
    );
    tree.setPositionWithLocalVector(new BABYLON.Vector3.Zero());
    tree.material = treeMaterial;

    // we want to randomly genereate trees with varying width(todo)
    // with a z position along the scene with varying positions between -25 and -35 in x
    for (let i = 0; i < 100; i++) {
      const xPos = Math.floor(Math.random() * 45) + 35;
      const width = Math.floor(Math.random() * 6) + 3;

      let treeLeft = tree.clone();
      treeLeft.setPositionWithLocalVector(
        new BABYLON.Vector3(-xPos, 5, i * 15)
      );
      treeLeft.width = width;

      let treeRight = tree.clone();
      treeRight.setPositionWithLocalVector(
        new BABYLON.Vector3(xPos, 5, i * 15)
      );
      treeRight.width = width;

      this.leftTrees.push(treeLeft);
      this.rightTrees.push(treeRight);
    }

    // remove clone tree
    tree.dispose();

    scene.registerBeforeRender(() => {
      for (let i = 0; i < 100; i++) {
        this.rightTrees[i].position.z -= DEFAULT_MOVING_SPEED;
        this.leftTrees[i].position.z -= DEFAULT_MOVING_SPEED;
      }
    });
  }

  reset() {
    this.leftTrees.forEach(tree => tree.dispose());
    this.rightTrees.forEach(tree => tree.dispose());
  }
}

export default Trees;
