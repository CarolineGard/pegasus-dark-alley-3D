import * as BABYLON from "@babylonjs/core";
import { DEFAULT_MOVING_SPEED } from "./constants";

class Coins {
  constructor() {
    this.coin = null;
  }

  reset() {
    if (this.coin) {
      this.coin.dispose();
    }
  }

  setup(scene, player) {
    this.coin = BABYLON.MeshBuilder.CreateCylinder(
      Math.random()
        .toString(36)
        .substring(7),
      { diameter: 3, height: 0.3, tessellation: 96 },
      scene,
      true
    );

    let coinMaterial = new BABYLON.StandardMaterial("material", scene);
    coinMaterial.diffuseColor = new BABYLON.Color3(0.95, 0.7, 0.31);
    coinMaterial.specularColor = new BABYLON.Color3(0.95, 0.7, 0.31);
    coinMaterial.ambientColor = new BABYLON.Color3(0.95, 0.7, 0.31);
    coinMaterial.emissiveColor = new BABYLON.Color3(0.95, 0.7, 0.31);
    this.coin.material = coinMaterial;

    this.coin.setPositionWithLocalVector(new BABYLON.Vector3(0, -49, 150));
    this.coin.rotate(BABYLON.Axis.Z, Math.PI / 2);

    let glowLayer = new BABYLON.GlowLayer("glow", scene);
    glowLayer.intensity = 0.4;
    glowLayer.addIncludedOnlyMesh(this.coin);

    this.coin.registerBeforeRender(() => {
      this.coin.position.z -= DEFAULT_MOVING_SPEED;
      this.coin.addRotation(0.01, 0, 0);

      if (this.coin.intersectsMesh(player.getPlayer(), false)) {
        player.addPoints();
        this.coin.dispose();
      }
    });
  }
}

export default Coins;
