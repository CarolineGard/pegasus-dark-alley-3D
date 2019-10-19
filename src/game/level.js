import * as BABYLON from "@babylonjs/core";
import * as cannon from "cannon";
import { DEFAULT_MOVING_SPEED } from "./constants";

class Level {
  setup(scene) {
    // physics engine
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.CannonJSPlugin(true, 10, cannon)
    );

    var shaderMaterial = new BABYLON.ShaderMaterial(
      "shader",
      scene,
      "groundPlane",
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

    var groundPlane = BABYLON.MeshBuilder.CreateGround(
      "groundPlane",
      {
        width: 100,
        height: 500,
        updatable: true,
        subdivisions: 1000
      },
      scene
    );
    groundPlane.setPositionWithLocalVector(new BABYLON.Vector3(0, -50, -20));
    groundPlane.material = shaderMaterial;

    scene.registerBeforeRender(() => {
      groundPlane.position.z -= DEFAULT_MOVING_SPEED;
    });

    var physicsImpostor = new BABYLON.PhysicsImpostor(
      groundPlane,
      BABYLON.PhysicsImpostor.BoxImpostor,
      {
        mass: 0,
        restitution: 0.9
      },
      scene
    );
  }
}

export default Level;
