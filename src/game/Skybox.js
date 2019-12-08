import * as BABYLON from "@babylonjs/core";

const SkyBox = scene => {
  // Reduce calls to gl.clear() by disable the default scene clearing behavior
  // Safe setting since the viewport will always be 100% filled (inside skybox)
  scene.autoClear = false; // Color buffer
  scene.autoClearDepthAndStencil = false; // Depth and stencil

  let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
  let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
  //   "src/textures/starSky",
  //   scene
  // );
  // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;
};

export default SkyBox;
