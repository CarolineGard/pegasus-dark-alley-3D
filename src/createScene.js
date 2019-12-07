import * as BABYLON from "@babylonjs/core";
import Camera from "./game/Camera";
import Gui from "./game/Gui";
import GuiStartMenu from "./game/GuiStartMenu";
import Level from "./game/Level";
import Light from "./game/Light";
import Player from "./game/Player";
import SceneEffects from "./game/SceneEffects";
import SkyBox from "./game/Skybox";
import Trees from "./game/Trees";

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

  GuiStartMenu(scene);

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
