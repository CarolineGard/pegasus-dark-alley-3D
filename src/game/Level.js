import * as BABYLON from "@babylonjs/core";
import * as cannon from "cannon";
import { DEFAULT_MOVING_SPEED, SCENE_LEVEL_LENGTH } from "./constants";

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

    // Start ground
    this.groundPlane1 = BABYLON.MeshBuilder.CreatePlane(
      "groundPlane1",
      {
        width: 60,
        height: SCENE_LEVEL_LENGTH
      },
      scene
    );

    this.groundPlane1.setPositionWithLocalVector(
      new BABYLON.Vector3(0, -50, START_POSITION)
    );

    this.groundPlane1.rotate(BABYLON.Axis.X, Math.PI / 2);

    let material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    // material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    // material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 1);
    // material.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    material.alpha = 1.0;

    this.groundPlane1.material = material;

    // Second ground
    this.groundPlane2 = this.groundPlane1.clone("groundPlane2");
    this.groundPlane2.setPositionWithLocalVector(
      new BABYLON.Vector3(0, -50, UPDATE_POSITION)
    );

    this.groundPlane2.material = material;

    this.groundPlane1.physicsImpostor = new BABYLON.PhysicsImpostor(
      this.groundPlane1,
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
