import * as BABYLON from "@babylonjs/core";
import { DEFAULT_MOVING_SPEED } from "./constants";

const Coins = (scene, player) => {
  let coin = BABYLON.MeshBuilder.CreateCylinder(
    "cone",
    { diameter: 3, height: 0.3, tessellation: 96 },
    scene,
    true
  );

  let coinMaterial = new BABYLON.StandardMaterial("material", scene);
  coinMaterial.diffuseColor = new BABYLON.Color3(0.95, 0.7, 0.31);
  coinMaterial.specularColor = new BABYLON.Color3(0.95, 0.7, 0.31);
  coinMaterial.ambientColor = new BABYLON.Color3(0.95, 0.7, 0.31);
  coinMaterial.emissiveColor = new BABYLON.Color3(0.95, 0.7, 0.31);
  coin.material = coinMaterial;

  coin.setPositionWithLocalVector(new BABYLON.Vector3(0, -49, 150));
  coin.rotate(BABYLON.Axis.Z, Math.PI / 2);

  let glowLayer = new BABYLON.GlowLayer("glow", scene);
  glowLayer.intensity = 0.4;
  glowLayer.addIncludedOnlyMesh(coin);

  scene.registerBeforeRender(() => {
    coin.position.z -= DEFAULT_MOVING_SPEED;
    coin.addRotation(0.01, 0, 0);

    if (coin.intersectsMesh(player.getPlayer(), false)) {
      player.addPoints();
      coin.dispose();
    }
  });
};

export default Coins;
