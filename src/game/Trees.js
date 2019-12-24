import * as BABYLON from "@babylonjs/core";

import {
  BEHIND_CAMERA_POSITION,
  DEFAULT_MOVING_SPEED,
  SCENE_LEVEL_LENGTH
} from "./constants";

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
    const UPDATE_POSITION = SCENE_LEVEL_LENGTH;
    this.leftTrees = [];
    this.rightTrees = [];

    let treeMaterial = new BABYLON.StandardMaterial("material", scene);
    treeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    treeMaterial.disableLighting = true;

    // we want to randomly genereate trees with varying width(todo)
    // with a z position along the scene with varying positions between -25 and -35 in x
    for (let i = 0; i < 100; i++) {
      const xPos = Math.floor(Math.random() * 45) + 35;
      const width = Math.floor(Math.random() * 5) + 2;

      let treeLeft = BABYLON.MeshBuilder.CreateCylinder(
        "treeLeft",
        {
          diameterTop: width,
          diameterBottom: width,
          height: 250,
          subdivisions: 10
        },
        scene
      );

      let treeRight = BABYLON.MeshBuilder.CreateCylinder(
        "treeRight",
        {
          diameterTop: width,
          diameterBottom: width,
          height: 250,
          subdivisions: 10
        },
        scene
      );

      treeLeft.material = treeMaterial;
      treeRight.material = treeMaterial;

      treeLeft.setPositionWithLocalVector(
        new BABYLON.Vector3(-xPos, 5, i * 15)
      );

      treeRight.setPositionWithLocalVector(
        new BABYLON.Vector3(xPos, 5, i * 15)
      );

      scene.registerBeforeRender(() => {
        if (treeLeft.position.z < BEHIND_CAMERA_POSITION) {
          treeLeft.position.z = UPDATE_POSITION;
        } else {
          treeLeft.position.z -= this.movingSpeed;
        }

        if (treeRight.position.z < BEHIND_CAMERA_POSITION) {
          treeRight.position.z = UPDATE_POSITION;
        } else {
          treeRight.position.z -= this.movingSpeed;
        }
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
