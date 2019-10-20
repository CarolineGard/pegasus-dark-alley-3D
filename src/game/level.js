import * as BABYLON from "@babylonjs/core";
import * as cannon from "cannon";
import { DEFAULT_MOVING_SPEED, SCENE_LEVEL_LENGTH } from "./constants";

const START_POSITION = SCENE_LEVEL_LENGTH / 2 - 150;
const UPDATE_POSITION = SCENE_LEVEL_LENGTH;

let getRandomNumber = (max = 4.0, min = 2.0) => {
  return Math.floor(Math.random() * (max - min) + min) / min;
};

let createShaderMaterial = (scene, rand1 = 1.0, rand2 = 1.0) => {
  let randomNumber1 = rand1;
  let randomNumber2 = rand2;

  let shaderMaterial = new BABYLON.ShaderMaterial(
    "shader",
    scene,
    "groundPlane",
    {
      attributes: ["position", "normal", "uv"],
      uniforms: ["worldViewProjection", "randomNumber1", "randomNumber2"],
      fogEnabled: true
    }
  );
  return shaderMaterial;
};

let updateMeshMaterial = mesh => {
  let randomNumber1 = getRandomNumber();
  let randomNumber2 = getRandomNumber();

  // Generate a new vertex randomixed texture for the material
  mesh.material.setFloat("randomNumber1", randomNumber1);
  mesh.material.setFloat("randomNumber2", randomNumber2);

  mesh.position.z = UPDATE_POSITION;
};

class Level {
  setup(scene) {
    // physics engine
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.CannonJSPlugin(true, 10, cannon)
    );

    // Start ground
    let groundPlane1 = BABYLON.MeshBuilder.CreateGround(
      "groundPlane1",
      {
        width: 100,
        height: SCENE_LEVEL_LENGTH,
        updatable: true,
        subdivisions: 500
      },
      scene
    );

    groundPlane1.setPositionWithLocalVector(
      new BABYLON.Vector3(0, -50, START_POSITION)
    );

    let shaderMaterial = createShaderMaterial();
    groundPlane1.material = shaderMaterial;

    // Second ground
    let groundPlane2 = groundPlane1.clone("groundPlane2");
    groundPlane2.setPositionWithLocalVector(
      new BABYLON.Vector3(0, -50, UPDATE_POSITION)
    );

    let randomNumber1 = getRandomNumber();
    let randomNumber2 = getRandomNumber();

    let shaderMaterial2 = createShaderMaterial(
      scene,
      randomNumber1,
      randomNumber2
    );
    groundPlane2.material = shaderMaterial2;

    // Render Loop
    scene.registerBeforeRender(() => {
      // If ground plane is behind camera: Update with new position and create new shader material
      if (groundPlane1.position.z < -START_POSITION)
        updateMeshMaterial(groundPlane1);
      else groundPlane1.position.z -= DEFAULT_MOVING_SPEED;

      if (groundPlane2.position.z < -START_POSITION)
        updateMeshMaterial(groundPlane2);
      else groundPlane2.position.z -= DEFAULT_MOVING_SPEED;
    });

    let physicsImpostor = new BABYLON.PhysicsImpostor(
      groundPlane1,
      BABYLON.PhysicsImpostor.BoxImpostor,
      {
        mass: 0.0,
        restitution: 0.9
      },
      scene
    );
  }
}

export default Level;
