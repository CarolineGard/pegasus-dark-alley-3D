import * as BABYLON from "@babylonjs/core";

import { SCENE_LEVEL_LENGTH, DEFAULT_MOVING_SPEED } from "./constants";

class Obstacles {
  constructor() {
    this.obstacles = [];
  }

  setup(scene, setCurrentGameMode, player) {
    const NUMBER_OF_OBSTACLES = 10;
    const Z_POS_DIFFERENCE = SCENE_LEVEL_LENGTH / NUMBER_OF_OBSTACLES;
    const BEHIND_CAMERA_POSITION = -SCENE_LEVEL_LENGTH / 2 - 200;
    const START_POSITION = SCENE_LEVEL_LENGTH / 2 - 150;
    const UPDATE_POSITION = START_POSITION + SCENE_LEVEL_LENGTH;

    this.obstacles = [];

    let defaultHeight = 200;
    let defaultWidth = 10;

    let obstacleMaterial = new BABYLON.StandardMaterial("material", scene);
    obstacleMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    let obstacle = BABYLON.MeshBuilder.CreateBox(
      "obstacle",
      { width: defaultWidth, height: defaultHeight, depth: 7 },
      scene
    );

    obstacle.setPositionWithLocalVector(new BABYLON.Vector3(0, 0, 250));
    obstacle.material = obstacleMaterial;

    for (let i = 0; i < NUMBER_OF_OBSTACLES; i++) {
      let object = obstacle.clone();
      let height = defaultHeight;

      const width = Math.floor(Math.random() * 30) + 10;
      const isLow = Math.floor(Math.random() * 2) === 1 ? 1 : -1;

      if (isLow === -1) {
        height = 5;
        width += 10;
      }

      const scalingHeight = height / defaultHeight;
      const scalingWidth = width / defaultWidth;

      object.scaling = new BABYLON.Vector3(scalingWidth, scalingHeight, 1);

      // generate random number between -30 and 30 for x position
      const xPos = Math.floor(Math.random() * (30 - width / 2));
      xPos *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

      object.setPositionWithLocalVector(
        new BABYLON.Vector3(xPos, height / 2 - 1000, i * Z_POS_DIFFERENCE - 200)
      );

      object.physicsImpostor = new BABYLON.PhysicsImpostor(
        object,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 100 },
        scene
      );

      object.registerBeforeRender(() => {
        if (object.intersectsMesh(player.getPlayer(), false)) {
          setCurrentGameMode(2); // reset game
        }

        if (object.position.z < BEHIND_CAMERA_POSITION) {
          object.position.z = UPDATE_POSITION;
        } else {
          object.position.z -= DEFAULT_MOVING_SPEED;
        }
      });

      this.obstacles.push(object);
    }
    // remove clone obstacle
    obstacle.dispose();
  }

  reset() {
    this.obstacles.forEach(obstacle => obstacle.dispose());
  }
}

export default Obstacles;
