import * as BABYLON from "@babylonjs/core";
import * as cannon from "cannon";

import {
  DEFAULT_MOVING_SPEED,
  SCENE_LEVEL_LENGTH,
  SCENE_LEVEL_WIDTH
} from "./constants";

const BEHIND_CAMERA_POSITION = -SCENE_LEVEL_LENGTH / 2 - 200;
const START_POSITION = SCENE_LEVEL_LENGTH / 2 - 150;
const UPDATE_POSITION = START_POSITION + SCENE_LEVEL_LENGTH - 5;

class Level {
  constructor() {
    this.groundPlane1 = null;
    this.groundPlane2 = null;
    this.movingSpeed = DEFAULT_MOVING_SPEED;
  }

  startMusic(scene) {
    this.inGameMusic = new BABYLON.Sound(
      "inGameMusic",
      "./src/sounds/music.mp3",
      scene,
      () => {
        this.inGameMusic.play();
      },
      { loop: true }
    );
  }

  stopMusic() {
    if (this.inGameMusic) {
      this.inGameMusic.stop();
    }
  }

  setMovingSpeed(updatedSpeed) {
    this.movingSpeed = updatedSpeed;
  }

  setup(scene) {
    // physics engine
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.CannonJSPlugin(true, 10, cannon)
    );

    var planeShaderMaterial = new BABYLON.ShaderMaterial(
      "shader",
      scene,
      "groundLevel",
      {
        attributes: ["position", "normal", "uv"],
        uniforms: [
          "world",
          "worldView",
          "worldViewProjection",
          "view",
          "projection"
        ]
      }
    );

    // Start ground
    this.groundPlane1 = BABYLON.MeshBuilder.CreateGround(
      "groundPlane1",
      {
        width: SCENE_LEVEL_WIDTH,
        height: SCENE_LEVEL_LENGTH,
        subdivisions: 200
      },
      scene
    );

    this.groundPlane1.material = planeShaderMaterial;
    this.groundPlane1.setPositionWithLocalVector(
      new BABYLON.Vector3(0, -50, START_POSITION)
    );

    // Second ground
    this.groundPlane2 = BABYLON.MeshBuilder.CreateGround(
      "groundPlane2",
      {
        width: SCENE_LEVEL_WIDTH,
        height: SCENE_LEVEL_LENGTH,
        subdivisions: 200
      },
      scene
    );

    this.groundPlane2.material = planeShaderMaterial;
    this.groundPlane2.setPositionWithLocalVector(
      new BABYLON.Vector3(0, -50, UPDATE_POSITION)
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

    // Render Loop
    scene.registerBeforeRender(() => {
      if (this.groundPlane1.position.z < BEHIND_CAMERA_POSITION) {
        this.groundPlane1.position.z = UPDATE_POSITION;
      } else {
        this.groundPlane1.position.z -= this.movingSpeed;
      }

      if (this.groundPlane2.position.z < BEHIND_CAMERA_POSITION) {
        this.groundPlane2.position.z = UPDATE_POSITION;
      } else {
        this.groundPlane2.position.z -= this.movingSpeed;
      }
    });
  }

  reset() {
    this.groundPlane1.position.z = START_POSITION;
    this.groundPlane2.position.z = UPDATE_POSITION;
  }
}

export default Level;
