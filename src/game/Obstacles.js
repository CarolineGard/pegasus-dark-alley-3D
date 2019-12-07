import * as BABYLON from "@babylonjs/core";

import { SCENE_LEVEL_LENGTH } from "./constants";

const Obstacles = (scene, level) => {
  const NUMBER_OF_OBSTACLES = 10;
  const Z_POS_DIFFERENCE = SCENE_LEVEL_LENGTH / NUMBER_OF_OBSTACLES;
  let DEFAULT_HEIGHT = 400;
  let DEFAULT_WIDTH = 10;

  let obstacleMaterial = new BABYLON.StandardMaterial("material", scene);
  obstacleMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  obstacleMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);

  let obstacle = BABYLON.MeshBuilder.CreateBox(
    "obstacle",
    { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT, depth: 0.5 },
    scene
  );

  obstacle.rotate(BABYLON.Axis.X, -(Math.PI / 2));
  obstacle.setPositionWithLocalVector(new BABYLON.Vector3.Zero());
  obstacle.material = obstacleMaterial;

  let obstacles = [];

  for (let i = 0; i < NUMBER_OF_OBSTACLES; i++) {
    let object = obstacle.clone();
    let height = DEFAULT_HEIGHT;

    const width = Math.floor(Math.random() * 30) + 10;
    const isLow = Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    if (isLow === -1) {
      height = 5;
      width += 10;
    }

    const scalingHeight = height / DEFAULT_HEIGHT;
    const scalingWidth = width / DEFAULT_WIDTH;

    object.scaling = new BABYLON.Vector3(scalingWidth, scalingHeight, 1);

    // generate random number between -30 and 30 for x position
    const xPos = Math.floor(Math.random() * (30 - width / 2));
    xPos *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    object.setPositionWithLocalVector(
      new BABYLON.Vector3(xPos, 0, i * Z_POS_DIFFERENCE - 200)
    );

    object.parent = level;
    obstacles.push(object);
  }
  // remove clone obstacle
  obstacle.dispose();
};

export default Obstacles;
