import * as BABYLON from "@babylonjs/core";

// Add effects to the scene surrounding such as fog, shadows, grains etc.
const sceneEffects = scene => {
  // Add fog to the scene
  scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
  scene.fogDensity = 0.01;
  scene.fogStart = 20.0;
  scene.fogEnd = 60.0;
  scene.fogColor = new BABYLON.Color3(0.1, 0.1, 0.1);
};

export default sceneEffects;
