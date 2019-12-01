import * as BABYLON from "@babylonjs/core";
import Camera from "./game/Camera";
import Light from "./game/Light";
import SkyBox from "./game/Skybox";
import Player from "./game/Player";
import Level from "./game/Level";
import SceneEffects from "./game/SceneEffects";
import Trees from "./game/Trees";
import Gui from "./game/Gui";

/******* Add the create scene function ******/
const CreateScene = (engine, canvas) => {
  let scene = new BABYLON.Scene(engine);

  // Reduce calls to gl.clear() by disable the default scene clearing behavior
  // Safe setting since the viewport will always be 100% filled (inside skybox)
  scene.autoClear = false; // Color buffer
  scene.autoClearDepthAndStencil = false; // Depth and stencil

  let camera = Camera(canvas, scene);
  scene.activeCamera = camera;
  Light(scene);

  SkyBox(scene);
  let level = new Level();
  level.setup(scene);

  SceneEffects(scene);
  Trees(scene);

  let player = new Player();
  player.setup(scene);
  Gui(scene, player);

  return scene;
};

export default CreateScene;
