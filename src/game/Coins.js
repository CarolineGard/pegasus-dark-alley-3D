import * as BABYLON from "@babylonjs/core";
import { DEFAULT_MOVING_SPEED, SCENE_LEVEL_LENGTH } from "./constants";

class Coins {
  constructor() {
    this.coins = [];
    this.movingSpeed = DEFAULT_MOVING_SPEED;
  }

  reset() {
    if (this.coins) {
      this.coins.forEach(coin => coin.dispose());
    }
  }

  setMovingSpeed(updatedSpeed) {
    this.movingSpeed = updatedSpeed;
  }

  setup(scene, player) {
    const NUMBER_OF_COINS = 20;
    const INITIAL_COIN_OFFSET = 50;
    const DISTANCE_BETWEEN_COINS = 200;
    const BEHIND_CAMERA_POSITION = -150;
    const UPDATE_POSITION =
      INITIAL_COIN_OFFSET + NUMBER_OF_COINS * DISTANCE_BETWEEN_COINS;

    let coinMaterial = new BABYLON.StandardMaterial("material", scene);
    coinMaterial.diffuseColor = new BABYLON.Color3(0.95, 0.7, 0.31);
    coinMaterial.specularColor = new BABYLON.Color3(0.95, 0.7, 0.31);
    coinMaterial.ambientColor = new BABYLON.Color3(0.95, 0.7, 0.31);
    coinMaterial.emissiveColor = new BABYLON.Color3(0.95, 0.7, 0.31);

    let glowLayer = new BABYLON.GlowLayer("glow", scene);
    glowLayer.intensity = 0.4;

    for (let i = 0; i < NUMBER_OF_COINS; i++) {
      let coin = BABYLON.MeshBuilder.CreateCylinder(
        `coin${i}`,
        { diameter: 3, height: 0.3, tessellation: 96 },
        scene,
        true
      );
      coin.material = coinMaterial;

      let xPos = Math.floor(Math.random() * (40 - 1.5 / 2));
      xPos *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
      let zPos = (i + 1) * DISTANCE_BETWEEN_COINS + INITIAL_COIN_OFFSET;

      coin.setPositionWithLocalVector(new BABYLON.Vector3(xPos, -49, zPos));
      coin.rotate(BABYLON.Axis.Z, Math.PI / 2);

      glowLayer.addIncludedOnlyMesh(coin);

      this.coins.push(coin);
    }

    this.coins.forEach((coin, i) => {
      scene.registerBeforeRender(() => {
        coin.addRotation(0.01, 0, 0);

        if (coin.position.z < BEHIND_CAMERA_POSITION) {
          coin.setEnabled(true);
          coin.position.z = UPDATE_POSITION;
        } else {
          coin.position.z -= this.movingSpeed;
        }

        if (
          coin.intersectsMesh(player.getPlayer(), false) &&
          coin.isEnabled() === true
        ) {
          var coinSound = new BABYLON.Sound(
            "coinSound",
            "./src/sounds/coin.wav",
            scene,
            function() {
              coinSound.play();
            }
          );
          player.addPoints();
          coin.setEnabled(false);
        }
      });
    });
  }
}

export default Coins;
