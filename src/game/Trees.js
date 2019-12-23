import * as BABYLON from "@babylonjs/core";

import { DEFAULT_MOVING_SPEED, INCREASE_SPEED } from "./constants";

class Trees {
  constructor() {
    this.leftTrees = [];
    this.rightTrees = [];
    this.movingSpeed = DEFAULT_MOVING_SPEED;
  }

  setMovingSpeed(updatedSpeed) {
    this.movingSpeed = updatedSpeed;
  }

  setup(scene) {
    this.leftTrees = [];
    this.rightTrees = [];

    let treeMaterial = new BABYLON.StandardMaterial("material", scene);
    treeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    // we want to randomly genereate trees with varying width(todo)
    // with a z position along the scene with varying positions between -25 and -35 in x
    for (let i = 0; i < 100; i++) {
      const xPos = Math.floor(Math.random() * 45) + 35;
      const width = Math.floor(Math.random() * 6) + 3;

      let treeLeft = BABYLON.MeshBuilder.CreatePlane(
        "treeLeft",
        { width: width, height: 250 },
        scene
      );
      treeLeft.material = treeMaterial;

      let treeRight = BABYLON.MeshBuilder.CreatePlane(
        "treeRight",
        { width: width, height: 250 },
        scene
      );
      treeRight.material = treeMaterial;

      treeLeft.setPositionWithLocalVector(
        new BABYLON.Vector3(-xPos, 5, i * 15)
      );

      treeLeft.registerBeforeRender(() => {
        treeLeft.position.z -= this.movingSpeed;
      });

      treeRight.setPositionWithLocalVector(
        new BABYLON.Vector3(xPos, 5, i * 15)
      );
      treeRight.registerBeforeRender(() => {
        treeRight.position.z -= this.movingSpeed;
      });

      this.leftTrees.push(treeLeft);
      this.rightTrees.push(treeRight);
    }
  }

  reset() {
    this.leftTrees.forEach(tree => tree.dispose());
    this.rightTrees.forEach(tree => tree.dispose());
  }
}

export default Trees;
