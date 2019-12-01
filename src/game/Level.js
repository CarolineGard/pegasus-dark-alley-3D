import * as BABYLON from "@babylonjs/core";
import * as cannon from "cannon";
import { DEFAULT_MOVING_SPEED, SCENE_LEVEL_LENGTH } from "./constants";

const BEHIND_CAMERA_POSITION = -SCENE_LEVEL_LENGTH / 2 - 200;
const START_POSITION = SCENE_LEVEL_LENGTH / 2 - 150;
const UPDATE_POSITION = START_POSITION + SCENE_LEVEL_LENGTH;

class Level {
  setup(scene) {
    // physics engine
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.CannonJSPlugin(true, 10, cannon)
    );

    // Start ground
    let groundPlane1 = BABYLON.MeshBuilder.CreatePlane(
      "groundPlane1",
      {
        width: 60,
        height: SCENE_LEVEL_LENGTH
      },
      scene
    );

    groundPlane1.setPositionWithLocalVector(
      new BABYLON.Vector3(0, -50, START_POSITION)
    );

    groundPlane1.rotate(BABYLON.Axis.X, Math.PI / 2);

    let material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    // material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    // material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 1);
    // material.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    material.alpha = 1.0;

    groundPlane1.material = material;

    // Second ground
    let groundPlane2 = groundPlane1.clone("groundPlane2");
    groundPlane2.setPositionWithLocalVector(
      new BABYLON.Vector3(0, -50, UPDATE_POSITION)
    );

    groundPlane2.material = material;

    groundPlane1.physicsImpostor = new BABYLON.PhysicsImpostor(
      groundPlane1,
      BABYLON.PhysicsImpostor.BoxImpostor,
      {
        mass: 0.0,
        restitution: 0.9
      },
      scene
    );

    // Render Loop
    scene.registerBeforeRender(() => {
      // If ground plane is behind camera: Update with new position and create new shader material
      if (groundPlane1.position.z < BEHIND_CAMERA_POSITION) {
        groundPlane1.position.z = UPDATE_POSITION;
      } else {
        groundPlane1.position.z -= DEFAULT_MOVING_SPEED;
      }

      if (groundPlane2.position.z < BEHIND_CAMERA_POSITION) {
        groundPlane2.position.z = UPDATE_POSITION;
      } else {
        groundPlane2.position.z -= DEFAULT_MOVING_SPEED;
      }
    });
  }
}

export default Level;
