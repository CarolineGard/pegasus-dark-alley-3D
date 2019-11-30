import * as BABYLON from "@babylonjs/core";
import * as cannon from "cannon";
import * as Ammo from "ammo.js";

import { DEFAULT_MOVING_SPEED, SCENE_LEVEL_LENGTH } from "./constants";

const START_POSITION = SCENE_LEVEL_LENGTH / 2 - 150;
const UPDATE_POSITION = SCENE_LEVEL_LENGTH;

let createShaderMaterial = (scene, rand1 = 1.0, rand2 = 1.0) => {
  let randomNumber1 = rand1;
  let randomNumber2 = rand2;

  let shaderMaterial = new BABYLON.ShaderMaterial(
    "shader",
    scene,
    "groundPlane",
    {
      attributes: ["position", "normal", "uv"],
      uniforms: ["world", "worldViewProjection", "randomNumber1", "randomNumber2"],
      fogEnabled: true
    }
  );
  return shaderMaterial;
};

class Level {
  constructor(){
    let plane = null
  }

  getPlane(){
    return this.plane;
  }

  setup(scene) {
    // physics engine
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      // new BABYLON.AmmoJSPlugin(true, Ammo)
      new BABYLON.CannonJSPlugin(true, 10, cannon)
    );

    // Start ground
   this.plane = BABYLON.MeshBuilder.CreateGround(
      "groundPlane1",
      {
        width: 80,
        height: SCENE_LEVEL_LENGTH,
        updatable: true,
        subdivisions: 500,
      },
      scene
    );

    this.plane.setPositionWithLocalVector(
      new BABYLON.Vector3(0, -50, START_POSITION)
    );

    let shaderMaterial1 = createShaderMaterial();
    this.plane.material = shaderMaterial1;
    this.plane.showBoundingBox = true;

    this.plane.material.wireframe = true;
    this.plane.physicsImpostor = new BABYLON.PhysicsImpostor(
      this.plane,
      BABYLON.PhysicsImpostor.MeshImpostor,
      {mass: 0, friction: 0, restitution: 0.3},
      scene
      );
      
      
    // Render Loop
    scene.registerBeforeRender(() => {
        this.plane.position.z -= DEFAULT_MOVING_SPEED;
    });
  }
}

export default Level;
