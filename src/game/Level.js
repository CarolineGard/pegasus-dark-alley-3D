import * as BABYLON from "@babylonjs/core";
import * as cannon from "cannon";

import {
  DEFAULT_MOVING_SPEED,
  SCENE_LEVEL_LENGTH,
  SCENE_LEVEL_WIDTH
} from "./constants";
import Obstacles from "./Obstacles";

const BEHIND_CAMERA_POSITION = -SCENE_LEVEL_LENGTH / 2 - 200;
const START_POSITION = SCENE_LEVEL_LENGTH / 2 - 150;
const UPDATE_POSITION = START_POSITION + SCENE_LEVEL_LENGTH;

class Level {
  constructor() {
    this.groundPlane1 = null;
    this.groundPlane2 = null;
  }

  setup(scene) {
    // physics engine
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.CannonJSPlugin(true, 10, cannon)
    );

    let material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    material.alpha = 1.0;

    // Start ground
    this.groundPlane1 = BABYLON.MeshBuilder.CreatePlane(
      "groundPlane1",
      {
        width: SCENE_LEVEL_WIDTH,
        height: SCENE_LEVEL_LENGTH
      },
      scene
    );

    this.groundPlane1.material = material;

    this.groundPlane1.setPositionWithLocalVector(
      new BABYLON.Vector3(0, -50, START_POSITION)
    );
    this.groundPlane1.rotate(BABYLON.Axis.X, Math.PI / 2);

    // Second ground
    this.groundPlane2 = this.groundPlane1.clone("groundPlane2");

    this.groundPlane2.material = material;

    this.groundPlane2.setPositionWithLocalVector(
      new BABYLON.Vector3(0, -50, UPDATE_POSITION)
    );

    let test = BABYLON.MeshBuilder.CreateBox(
      "test",
      { width: 20, height: 20, depth: 0.5 },
      scene
    );
    test.setPositionWithLocalVector(new BABYLON.Vector3(0, -10, 250));

    let testMat = new BABYLON.StandardMaterial("material", scene);
    testMat.diffuseColor = new BABYLON.Color3(255, 0, 0);
    test.material = testMat;

    test.physicsImpostor = new BABYLON.PhysicsImpostor(
      test,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 1, restitution: 0.9 },
      scene
    );

    [this.groundPlane1, this.groundPlane2].forEach(ground => {
      ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground,
        BABYLON.PhysicsImpostor.BoxImpostor,
        {
          mass: 0.0,
          restitution: 0.9
        },
        scene
      );
    });
    // Add obstacles for each plane
    // Obstacles(scene, this.groundPlane1);
    // Obstacles(scene, this.groundPlane2);

    // Render Loop
    scene.registerBeforeRender(() => {
      if (test.intersectsMesh(player.getPlayer(), false)) {
        console.log("INTERSECT");
      }
      // If ground plane is behind camera: Update with new position and create new shader material
      test.position.z -= DEFAULT_MOVING_SPEED;
      if (this.groundPlane1.position.z < BEHIND_CAMERA_POSITION) {
        this.groundPlane1.position.z = UPDATE_POSITION;
      } else {
        this.groundPlane1.position.z -= DEFAULT_MOVING_SPEED;
      }

      if (this.groundPlane2.position.z < BEHIND_CAMERA_POSITION) {
        this.groundPlane2.position.z = UPDATE_POSITION;
      } else {
        this.groundPlane2.position.z -= DEFAULT_MOVING_SPEED;
      }
    });
  }

  resetLevel() {
    this.groundPlane1.position.z = START_POSITION;
    this.groundPlane2.position.z = UPDATE_POSITION;
  }
}

export default Level;
