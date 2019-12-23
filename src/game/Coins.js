import * as BABYLON from "@babylonjs/core";
import { DEFAULT_MOVING_SPEED } from "./constants";

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

      coin.setPositionWithLocalVector(
        new BABYLON.Vector3(xPos, -49, (i + 1) * 150)
      );
      coin.rotate(BABYLON.Axis.Z, Math.PI / 2);

      glowLayer.addIncludedOnlyMesh(coin);

      this.coins.push(coin);
    }

    this.coins.forEach(coin => {
      scene.registerBeforeRender(() => {
        coin.addRotation(0.01, 0, 0);

        coin.position.z -= this.movingSpeed;

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
