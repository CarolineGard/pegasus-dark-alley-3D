import * as BABYLON from "@babylonjs/core";

// Add effects to the scene surrounding such as fog, shadows, grains etc.

const fog = scene => {
  scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
  scene.fogDensity = 0.01;
  scene.fogStart = 0.0;
  scene.fogEnd = 100.0;
  scene.fogColor = new BABYLON.Color3(0.09, 0.09, 0.09);
};

const SceneEffects = scene => {
  fog(scene);
};

export default SceneEffects;
