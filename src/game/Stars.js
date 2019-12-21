import * as BABYLON from "@babylonjs/core";
import { DEFAULT_MOVING_SPEED } from "./constants";

class Stars {
  constructor() {
    this.star = null;
  }

  reEnable() {
    this.showStar();
    this.star.position.y = -50;
    this.star.position.z = 200;
  }

  showStar() {
    this.star.setEnabled(true);
  }

  hideStar() {
    this.star.setEnabled(false);
  }

  setup(scene, player, assetsManager, setCurrentGameMode) {
    this.star = assetsManager.getMesh("star");

    let coinMaterial = new BABYLON.StandardMaterial("material", scene);
    coinMaterial.diffuseColor = new BABYLON.Color3(0.58, 0.39, 0.63);
    coinMaterial.specularColor = new BABYLON.Color3(0.58, 0.39, 0.63);
    coinMaterial.ambientColor = new BABYLON.Color3(0.58, 0.39, 0.63);
    coinMaterial.emissiveColor = new BABYLON.Color3(0.58, 0.39, 0.63);
    this.star.material = coinMaterial;

    let glowLayer = new BABYLON.GlowLayer("glow", scene);
    glowLayer.intensity = 0.5;
    glowLayer.addIncludedOnlyMesh(this.star);

    this.star.setEnabled(true);
    this.star.position.y = -50;
    this.star.position.z = 200;
    this.star.scaling = new BABYLON.Vector3(2, 2, 2);
    this.star.rotate(BABYLON.Axis.X, -Math.PI / 2);
    this.star.rotate(BABYLON.Axis.Z, Math.PI);

    this.star.physicsImpostor = new BABYLON.PhysicsImpostor(
      this.star,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0 }
    );

    scene.registerBeforeRender(() => {
      this.star.position.z -= DEFAULT_MOVING_SPEED;

      if (this.star.intersectsMesh(player.getPlayer(), false)) {
        if (player.isAttacking()) {
          player.addPoints(1000);
          this.hideStar();
        } else {
          setCurrentGameMode(2);
        }
      }
    });
  }
}

export default Stars;
