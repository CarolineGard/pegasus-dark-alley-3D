import * as BABYLON from "@babylonjs/core";

import {
  BEHIND_CAMERA_POSITION,
  DEFAULT_MOVING_SPEED,
  SCENE_LEVEL_LENGTH
} from "./constants";

class Obstacles {
  constructor() {
    this.obstacles = [];
    this.movingSpeed = DEFAULT_MOVING_SPEED;
  }

  setMovingSpeed(updatedSpeed) {
    this.movingSpeed = updatedSpeed;
  }

  setup(scene, setCurrentGameMode, player) {
    const NUMBER_OF_OBSTACLES = 20;
    const UPDATE_POSITION = SCENE_LEVEL_LENGTH;
    const Z_POS_DIFFERENCE = (SCENE_LEVEL_LENGTH * 2) / NUMBER_OF_OBSTACLES;

    this.obstacles = [];

    let defaultHeight = 200;

    let obstacleMaterial = new BABYLON.StandardMaterial("material", scene);
    obstacleMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    for (let i = 0; i < NUMBER_OF_OBSTACLES; i++) {
      let height = defaultHeight;

      const width = Math.floor(Math.random() * 30) + 10;
      const isLow = Math.floor(Math.random() * 2) === 1 ? 1 : -1;

      if (isLow === -1) {
        height = 5;
        width += 10;
      }

      let obstacle = BABYLON.MeshBuilder.CreateBox(
        `obstacle${i}`,
        { width: width, height: height, depth: 7 },
        scene
      );
      obstacle.material = obstacleMaterial;

      // generate random number between -30 and 30 for x position
      const xPos = Math.floor(Math.random() * (30 - width / 2));
      xPos *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

      obstacle.setPositionWithLocalVector(
        new BABYLON.Vector3(xPos, height / 2 - 43, i * Z_POS_DIFFERENCE + 200)
      );

      obstacle.physicsImpostor = new BABYLON.PhysicsImpostor(
        obstacle,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 100 },
        scene
      );

      scene.registerBeforeRender(() => {
        if (obstacle.intersectsMesh(player.getPlayer(), false)) {
          player.setDeadStatus(true);
          setCurrentGameMode(2); // reset game
        }

        if (obstacle.position.z < BEHIND_CAMERA_POSITION) {
          obstacle.position.z = UPDATE_POSITION;
        } else {
          obstacle.position.z -= this.movingSpeed;
        }
      });

      this.obstacles.push(obstacle);
    }
  }

  reset() {
    this.obstacles.forEach(obstacle => obstacle.dispose());
  }
}

export default Obstacles;
